/**
 * LearnPath AI - Main Application Logic
 * TAS 2025 Hackathon Entry - BULLETPROOF VERSION
 * GUARANTEED TO WORK FOR HACKATHON DEMO!
 */

class LearnPathAI {
    constructor() {
        this.currentCourse = null;
        this.userProgress = {};
        this.searchHistory = [];
        this.init();
    }

    init() {
        this.bindEventListeners();
        this.setupProgressTracking();
        this.loadUserProgress();
        console.log('✅ LearnPath AI initialized successfully! Ready for hackathon demo! 🚀');
    }

    bindEventListeners() {
        // Search form
        const searchForm = document.getElementById('searchForm');
        if (searchForm) {
            searchForm.addEventListener('submit', this.handleSearch.bind(this));
        }

        // Suggestion tags
        const suggestionTags = document.querySelectorAll('.suggestion-tag');
        suggestionTags.forEach(tag => {
            tag.addEventListener('click', (e) => {
                const topic = e.target.dataset.topic || e.target.textContent;
                document.getElementById('searchInput').value = topic;
                this.handleSearch(e);
            });
        });

        // Modal controls
        this.bindModalEvents();
        
        // Keyboard shortcuts
        document.addEventListener('keydown', this.handleKeyboardShortcuts.bind(this));
        
        // Dynamic button handling
        document.addEventListener('click', this.handleProgressButtons.bind(this));
        
        // Quiz and notes functionality
        const generateQuizBtn = document.getElementById('generateQuizBtn');
        const generateNotesBtn = document.getElementById('generateNotesBtn');
        
        if (generateQuizBtn) {
            generateQuizBtn.addEventListener('click', this.generateQuiz.bind(this));
        }
        
        if (generateNotesBtn) {
            generateNotesBtn.addEventListener('click', this.generateInteractiveNotes.bind(this));
        }
    }

    bindModalEvents() {
        const modals = ['videoModal', 'notesModal'];
        const closeButtons = ['modalClose', 'notesModalClose'];
        
        modals.forEach((modalId, index) => {
            const modal = document.getElementById(modalId);
            const closeBtn = document.getElementById(closeButtons[index]);
            
            if (closeBtn) {
                closeBtn.addEventListener('click', () => this.closeModal(modalId));
            }
            
            if (modal) {
                modal.addEventListener('click', (e) => {
                    if (e.target === modal) {
                        this.closeModal(modalId);
                    }
                });
            }
        });
    }

    async handleSearch(e) {
        e.preventDefault();
        
        const searchInput = document.getElementById('searchInput');
        const difficultyLevel = document.getElementById('difficultyLevel');
        const courseDuration = document.getElementById('courseDuration');
        
        const query = searchInput.value.trim();
        if (!query) {
            this.showNotification('Please enter a topic to search for!', 'warning');
            return;
        }

        const searchParams = {
            query: query.toLowerCase(),
            difficulty: difficultyLevel?.value || 'beginner',
            duration: courseDuration?.value || 'medium'
        };

        console.log('🔍 Searching for:', searchParams.query);

        try {
            this.showLoadingScreen();
            const courseData = await this.generateCourse(searchParams);
            
            if (courseData) {
                this.currentCourse = courseData;
                this.displayCourse(courseData);
                this.hideLoadingScreen();
                this.showCourseSection();
                this.showNotification(`✅ Found ${courseData.totalVideos} videos for ${courseData.title}!`, 'success');
            } else {
                throw new Error('No course data found');
            }
        } catch (error) {
            console.error('❌ Search error:', error);
            this.hideLoadingScreen();
            this.showNotification('❌ Unable to generate course. Please try a different topic.', 'error');
        }
    }

    async generateCourse(searchParams) {
        // Fetch demo data once and work on a shallow copy so DEMO_DATA isn't mutated
        const source = await this.getDemoData(searchParams.query);
        const MIN = (typeof CONFIG !== 'undefined' ? CONFIG.MIN_VIDEOS_PER_COURSE : 8);
        const MAX = (typeof CONFIG !== 'undefined' ? CONFIG.MAX_VIDEOS_PER_COURSE : 12);

        const course = {
            ...source,
            videos: Array.isArray(source.videos) ? source.videos.slice() : []
        };

        // Apply difficulty filter
        if (searchParams.difficulty && searchParams.difficulty !== '') {
            course.videos = this.filterVideosByDifficulty(course.videos, searchParams.difficulty);
        }

        // Apply duration filter
        if (searchParams.duration && searchParams.duration !== '') {
            course.videos = this.filterVideosByDuration(course.videos, searchParams.duration);
        }

        // Ensure minimum number of videos by filling from original source (preserve order and avoid duplicates)
        if (course.videos.length < MIN) {
            const ids = new Set(course.videos.map(v => v.id));
            for (const v of source.videos) {
                if (course.videos.length >= MIN) break;
                if (!ids.has(v.id)) {
                    course.videos.push(v);
                    ids.add(v.id);
                }
            }
        }

        // Cap to MAX
        course.videos = course.videos.slice(0, MAX);
        course.totalVideos = course.videos.length;
        return course;
    }
    
    filterVideosByDifficulty(videos, difficulty) {
        const MIN = (typeof CONFIG !== 'undefined' ? CONFIG.MIN_VIDEOS_PER_COURSE : 8);
        const MAX = (typeof CONFIG !== 'undefined' ? CONFIG.MAX_VIDEOS_PER_COURSE : 12);

        if (!difficulty || difficulty === '') return videos.slice(0, MAX);

        const difficultyMap = { 'beginner': 0, 'intermediate': 1, 'advanced': 2 };
        const targetLevel = difficultyMap[difficulty];

        // Filter videos by difficulty level
        const byLevel = videos.filter(v => {
            const videoLevel = difficultyMap[v.difficulty] || 0;
            return videoLevel === targetLevel;
        });

        // If we have enough videos of the target difficulty, return them
        if (byLevel.length >= MIN) {
            return byLevel.slice(0, MAX);
        }

        // If not enough videos of target difficulty, add videos from other levels
        const ids = new Set(byLevel.map(v => v.id));
        const merged = [...byLevel];
        
        // Add videos from other difficulty levels to reach minimum
        for (const v of videos) {
            if (merged.length >= MIN) break;
            if (!ids.has(v.id)) {
                merged.push(v);
                ids.add(v.id);
            }
        }
        
        return merged.slice(0, MAX);
    }
    
    filterVideosByDuration(videos, duration) {
        const MIN = (typeof CONFIG !== 'undefined' ? CONFIG.MIN_VIDEOS_PER_COURSE : 8);
        const MAX = (typeof CONFIG !== 'undefined' ? CONFIG.MAX_VIDEOS_PER_COURSE : 12);
        if (!duration || duration === '') return videos.slice(0, MAX);

        const durationMap = { short: 3, medium: 10, long: 1000 };
        const maxHours = durationMap[duration] || 1000;

        // Filter videos by duration
        const suitable = videos.filter(v => {
            const videoHours = this.parseDuration(v.duration);
            return videoHours <= maxHours;
        });

        // If we have enough videos of the target duration, return them
        if (suitable.length >= MIN) {
            return suitable.slice(0, MAX);
        }

        // If not enough videos of target duration, add videos from other durations
        const ids = new Set(suitable.map(v => v.id));
        const merged = [...suitable];
        
        // Add videos from other durations to reach minimum
        for (const v of videos) {
            if (merged.length >= MIN) break;
            if (!ids.has(v.id)) {
                merged.push(v);
                ids.add(v.id);
            }
        }
        
        return merged.slice(0, MAX);
    }
    
    parseDuration(duration) {
        if (!duration) return 0;
        if (typeof duration === 'number') return duration;

        // Support ISO 8601 durations like PT1H23M45S
        const isoMatch = /PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/.exec(duration);
        if (isoMatch) {
            const h = parseInt(isoMatch[1] || 0, 10);
            const m = parseInt(isoMatch[2] || 0, 10);
            const s = parseInt(isoMatch[3] || 0, 10);
            return h + m / 60 + s / 3600;
        }

        const parts = String(duration).split(':').map(p => parseInt(p, 10) || 0);
        if (parts.length === 3) {
            return parts[0] + parts[1] / 60 + parts[2] / 3600;
        }
        if (parts.length === 2) {
            return parts[0] / 60 + parts[1] / 3600; // treat mm:ss as minutes
        }
        if (parts.length === 1) {
            return parts[0] > 6 ? parts[0] / 60 : parts[0]; // heuristic: >6 => minutes
        }
        return 0;
    }

    async getDemoData(query) {
        // Simulate realistic loading time
        await this.delay(2500);
        
        // Smart query matching
        const normalizedQuery = query.toLowerCase();
        
        // Define query mappings first
    const queryMappings = {
            'py': 'python',
            'js': 'javascript',
            'reactjs': 'react',
            'react.js': 'react',
            'c plus plus': 'c++',
            'cpp': 'c++',
            'ml': 'machine learning',
            'ai': 'machine learning',
            'artificial intelligence': 'machine learning',
            'data analysis': 'data science',
            'data analytics': 'data science',
            'swift': 'swift programming',
            'swift language': 'swift programming',
            'php': 'php programming',
            'php programming': 'php programming',
            'sql': 'sql database',
            'sql database': 'sql database',
            'mysql': 'sql database',
            'postgresql': 'sql database',
            'mongodb': 'mongodb database',
            'oracle': 'oracle database',
            'database': 'sql database',
            'ruby': 'ruby programming',
            'ruby on rails': 'ruby on rails',
            'rails': 'ruby on rails',
            'go': 'golang programming',
            'golang': 'golang programming',
            'rust': 'rust programming',
            'kotlin': 'kotlin programming',
            'scala': 'scala programming',
            'r': 'r programming',
            'matlab': 'matlab programming',
            'perl': 'perl programming',
            'haskell': 'haskell programming',
            'clojure': 'clojure programming',
            'elixir': 'elixir programming',
            'erlang': 'erlang programming',
            'f#': 'f sharp programming',
            'f sharp': 'f sharp programming',
            'ocaml': 'ocaml programming',
            'lisp': 'lisp programming',
            'prolog': 'prolog programming',
            'assembly': 'assembly programming',
            'cobol': 'cobol programming',
            'fortran': 'fortran programming',
            'pascal': 'pascal programming',
            'ada': 'ada programming',
            'smalltalk': 'smalltalk programming',
            'lua': 'lua programming',
            'dart': 'dart programming',
            'flutter': 'flutter development',
            'angular': 'angular development',
            'vue': 'vue development',
            'vue.js': 'vue development',
            'svelte': 'svelte development',
            'next.js': 'nextjs development',
            'nextjs': 'nextjs development',
            'nuxt': 'nuxt development',
            'gatsby': 'gatsby development',
            'sveltekit': 'sveltekit development',
            'remix': 'remix development',
            'express': 'express development',
            'node': 'nodejs development',
            'nodejs': 'nodejs development',
            'deno': 'deno development',
            'bun': 'bun development',
            'nest': 'nestjs development',
            'nestjs': 'nestjs development',
            'fastify': 'fastify development',
            'koa': 'koa development',
            'hapi': 'hapi development',
            'socket.io': 'socketio development',
            'socketio': 'socketio development',
            'graphql': 'graphql development',
            'apollo': 'apollo development',
            'prisma': 'prisma development',
            'typeorm': 'typeorm development',
            'sequelize': 'sequelize development',
            'mongoose': 'mongoose development',
            'redis': 'redis development',
            'memcached': 'memcached development',
            'elasticsearch': 'elasticsearch development',
            'solr': 'solr development',
            'kafka': 'kafka development',
            'rabbitmq': 'rabbitmq development',
            'aws': 'aws development',
            'azure': 'azure development',
            'gcp': 'gcp development',
            'google cloud': 'gcp development',
            'docker': 'docker development',
            'kubernetes': 'kubernetes development',
            'k8s': 'kubernetes development',
            'terraform': 'terraform development',
            'ansible': 'ansible development',
            'jenkins': 'jenkins development',
            'gitlab': 'gitlab development',
            'github': 'github development',
            'bitbucket': 'bitbucket development',
            'jira': 'jira development',
            'confluence': 'confluence development',
            'slack': 'slack development',
            'discord': 'discord development',
            'telegram': 'telegram development',
            'whatsapp': 'whatsapp development',
            'signal': 'signal development',
            'viber': 'viber development',
            'wechat': 'wechat development',
            'line': 'line development',
            'kakao': 'kakao development',
            'naver': 'naver development',
            'baidu': 'baidu development',
            'alibaba': 'alibaba development',
            'amazon': 'amazon development',
            'ebay': 'ebay development',
            'shopify': 'shopify development',
            'woocommerce': 'woocommerce development',
            'magento': 'magento development',
            'prestashop': 'prestashop development',
            'opencart': 'opencart development',
            'bigcommerce': 'bigcommerce development',
            'squarespace': 'squarespace development',
            'wix': 'wix development',
            'wordpress': 'wordpress development',
            'drupal': 'drupal development',
            'joomla': 'joomla development',
            'ghost': 'ghost development',
            'medium': 'medium development',
            'substack': 'substack development',
            'mailchimp': 'mailchimp development',
            'constant contact': 'constant contact development',
            'aweber': 'aweber development',
            'getresponse': 'getresponse development',
            'activecampaign': 'activecampaign development',
            'hubspot': 'hubspot development',
            'salesforce': 'salesforce development',
            'pipedrive': 'pipedrive development',
            'zoho': 'zoho development',
            'freshworks': 'freshworks development',
            'zendesk': 'zendesk development',
            'intercom': 'intercom development',
            'drift': 'drift development',
            'calendly': 'calendly development',
            'acuity': 'acuity development',
            'bookly': 'bookly development',
            'appointy': 'appointy development',
            'simplybook': 'simplybook development',
            'timetrade': 'timetrade development',
            'genbook': 'genbook development',
            'schedulicity': 'schedulicity development',
            'mindbody': 'mindbody development',
            'glofox': 'glofox development',
            'zenplanner': 'zenplanner development',
            'wodify': 'wodify development',
            'pushpress': 'pushpress development',
            'fitli': 'fitli development',
            'virtuagym': 'virtuagym development',
            'mywellness': 'mywellness development',
            'mindbodyonline': 'mindbodyonline development',
            'glofox': 'glofox development',
            'zenplanner': 'zenplanner development',
            'wodify': 'wodify development',
            'pushpress': 'pushpress development',
            'fitli': 'fitli development',
            'virtuagym': 'virtuagym development',
            'mywellness': 'mywellness development',
            'ios': 'ios development',
            'ios dev': 'ios development',
            'android': 'android development',
            'android dev': 'android development',
            'web dev': 'web development',
            'web development': 'web development',
            'frontend': 'frontend development',
            'backend': 'backend development',
            'full stack': 'full stack development',
            'ui': 'ui design',
            'ux': 'ux design',
            'ui/ux': 'ui/ux design',
            'design': 'ui/ux design',
            'photoshop': 'photoshop tutorial',
            'illustrator': 'illustrator tutorial',
            'figma': 'figma tutorial',
            'sketch': 'sketch tutorial',
            'excel': 'excel tutorial',
            'powerpoint': 'powerpoint tutorial',
            'word': 'word tutorial',
            'office': 'microsoft office',
            'microsoft office': 'microsoft office',
            'cooking': 'cooking tutorial',
            'baking': 'baking tutorial',
            'guitar': 'guitar tutorial',
            'piano': 'piano tutorial',
            'music': 'music tutorial',
            'fitness': 'fitness tutorial',
            'workout': 'workout tutorial',
            'yoga': 'yoga tutorial',
            'meditation': 'meditation tutorial',
            'photography': 'photography',
            'photography tutorial': 'photography',
            'photo': 'photography',
            'camera': 'photography',
            'video editing': 'video editing tutorial',
            'premiere': 'premiere pro tutorial',
            'after effects': 'after effects tutorial',
            'blender': 'blender tutorial',
            '3d modeling': '3d modeling tutorial',
            'animation': 'animation tutorial',
            'drawing': 'drawing tutorial',
            'painting': 'painting tutorial',
            'art': 'art tutorial',
            'business': 'business tutorial',
            'entrepreneurship': 'entrepreneurship tutorial',
            'marketing': 'marketing tutorial',
            'sales': 'sales tutorial',
            'finance': 'finance tutorial',
            'accounting': 'accounting tutorial',
            'investing': 'investing tutorial',
            'trading': 'trading tutorial',
            'crypto': 'cryptocurrency tutorial',
            'bitcoin': 'bitcoin tutorial',
            'blockchain': 'blockchain tutorial',
            'nft': 'nft tutorial',
            'gaming': 'gaming tutorial',
            'game development': 'game development tutorial',
            'unity': 'unity tutorial',
            'unreal': 'unreal engine tutorial',
            'minecraft': 'minecraft tutorial',
            'fortnite': 'fortnite tutorial',
            'valorant': 'valorant tutorial',
            'league of legends': 'league of legends tutorial',
            'dota': 'dota tutorial',
            'csgo': 'csgo tutorial',
            'call of duty': 'call of duty tutorial',
            'fifa': 'fifa tutorial',
            'nba': 'nba tutorial',
            'football': 'football tutorial',
            'soccer': 'soccer tutorial',
            'tennis': 'tennis tutorial',
            'basketball': 'basketball tutorial',
            'volleyball': 'volleyball tutorial',
            'swimming': 'swimming tutorial',
            'running': 'running tutorial',
            'cycling': 'cycling tutorial',
            'dancing': 'dancing tutorial',
            'singing': 'singing tutorial',
            'acting': 'acting tutorial',
            'public speaking': 'public speaking tutorial',
            'presentation': 'presentation tutorial',
            'communication': 'communication tutorial',
            'leadership': 'leadership tutorial',
            'management': 'management tutorial',
            'project management': 'project management tutorial',
            'agile': 'agile tutorial',
            'scrum': 'scrum tutorial',
            'kanban': 'kanban tutorial',
            'jira': 'jira tutorial',
            'confluence': 'confluence tutorial',
            'slack': 'slack tutorial',
            'teams': 'microsoft teams tutorial',
            'zoom': 'zoom tutorial',
            'skype': 'skype tutorial',
            'discord': 'discord tutorial',
            'twitch': 'twitch tutorial',
            'youtube': 'youtube tutorial',
            'instagram': 'instagram tutorial',
            'tiktok': 'tiktok tutorial',
            'twitter': 'twitter tutorial',
            'facebook': 'facebook tutorial',
            'linkedin': 'linkedin tutorial',
            'snapchat': 'snapchat tutorial',
            'whatsapp': 'whatsapp tutorial',
            'telegram': 'telegram tutorial',
            'signal': 'signal tutorial',
            'viber': 'viber tutorial',
            'wechat': 'wechat tutorial',
            'line': 'line tutorial',
            'kakao': 'kakao tutorial',
            'naver': 'naver tutorial',
            'baidu': 'baidu tutorial',
            'alibaba': 'alibaba tutorial',
            'amazon': 'amazon tutorial',
            'ebay': 'ebay tutorial',
            'shopify': 'shopify tutorial',
            'woocommerce': 'woocommerce tutorial',
            'magento': 'magento tutorial',
            'prestashop': 'prestashop tutorial',
            'opencart': 'opencart tutorial',
            'bigcommerce': 'bigcommerce tutorial',
            'squarespace': 'squarespace tutorial',
            'wix': 'wix tutorial',
            'wordpress': 'wordpress tutorial',
            'drupal': 'drupal tutorial',
            'joomla': 'joomla tutorial',
            'ghost': 'ghost tutorial',
            'medium': 'medium tutorial',
            'substack': 'substack tutorial',
            'mailchimp': 'mailchimp tutorial',
            'constant contact': 'constant contact tutorial',
            'aweber': 'aweber tutorial',
            'getresponse': 'getresponse tutorial',
            'activecampaign': 'activecampaign tutorial',
            'hubspot': 'hubspot tutorial',
            'salesforce': 'salesforce tutorial',
            'pipedrive': 'pipedrive tutorial',
            'zoho': 'zoho tutorial',
            'freshworks': 'freshworks tutorial',
            'zendesk': 'zendesk tutorial',
            'intercom': 'intercom tutorial',
            'drift': 'drift tutorial',
            'calendly': 'calendly tutorial',
            'acuity': 'acuity tutorial',
            'bookly': 'bookly tutorial',
            'appointy': 'appointy tutorial',
            'simplybook': 'simplybook tutorial',
            'timetrade': 'timetrade tutorial',
            'genbook': 'genbook tutorial',
            'schedulicity': 'schedulicity tutorial',
            'mindbody': 'mindbody tutorial',
            'glofox': 'glofox tutorial',
            'zenplanner': 'zenplanner tutorial',
            'wodify': 'wodify tutorial',
            'pushpress': 'pushpress tutorial',
            'fitli': 'fitli tutorial',
            'virtuagym': 'virtuagym tutorial',
            'mywellness': 'mywellness tutorial',
            'mindbodyonline': 'mindbodyonline tutorial',
            'glofox': 'glofox tutorial',
            'zenplanner': 'zenplanner tutorial',
            'wodify': 'wodify tutorial',
            'pushpress': 'pushpress tutorial',
            'fitli': 'fitli tutorial',
            'virtuagym': 'virtuagym tutorial',
            'mywellness': 'mywellness tutorial'
        };
        
        // Check mappings - exact matches first
        if (queryMappings[normalizedQuery]) {
            const mappedValue = queryMappings[normalizedQuery];
            if (DEMO_DATA.courses[mappedValue]) {
                return DEMO_DATA.courses[mappedValue];
            }
        }
        
        // Check partial matches
        for (const [key, value] of Object.entries(queryMappings)) {
            if (normalizedQuery.includes(key) || key.includes(normalizedQuery)) {
                if (DEMO_DATA.courses[value]) {
                    return DEMO_DATA.courses[value];
                }
            }
        }
        
        // Partial matches
        for (const courseKey of Object.keys(DEMO_DATA.courses)) {
            if (courseKey.includes(normalizedQuery) || normalizedQuery.includes(courseKey)) {
                return DEMO_DATA.courses[courseKey];
            }
        }
        
        // Generate dynamic course for ANY topic - this is the key fix!
        return this.generateDynamicCourse(query);
    }

    generateDynamicCourse(query) {
        const capitalizedQuery = query.charAt(0).toUpperCase() + query.slice(1);
        
        // Topic-specific video ID mappings to ensure correct videos for each topic
        const topicVideoMappings = {
            'sql': [
                { id: 'HXV3zeQKqGY', channel: 'SQL Tutorial', duration: '1:20:39', views: '2.1M', rating: 4.8 },
                { id: '7S_tz1z_5bA', channel: 'SQL Master', duration: '2:45:30', views: '1.8M', rating: 4.7 },
                { id: 'p3qvj9hO_Bo', channel: 'Database Pro', duration: '1:15:45', views: '956K', rating: 4.9 },
                { id: 'Hl-zzrqQoSE', channel: 'Query Expert', duration: '1:32:18', views: '743K', rating: 4.6 },
                { id: 'QAV725a8BPE', channel: 'Data Master', duration: '2:45:22', views: '1.2M', rating: 4.8 },
                { id: 'r_MbozD32eo', channel: 'SQL Academy', duration: '1:28:15', views: '634K', rating: 4.7 },
                { id: 'Kmgo00avvEw', channel: 'Database Guru', duration: '1:45:33', views: '892K', rating: 4.5 },
                { id: 'msXL2oDexqw', channel: 'SQL Expert', duration: '1:15:27', views: '567K', rating: 4.6 },
                { id: 'vtPkZShrvXQ', channel: 'Data Pro', duration: '2:34:18', views: '423K', rating: 4.9 },
                { id: 'eIrMbAQSU34', channel: 'SQL Mastery', duration: '2:12:45', views: '789K', rating: 4.7 }
            ],
            'php': [
                { id: 'OK_JCtrrv-c', channel: 'PHP Tutorial', duration: '1:15:30', views: '3.2M', rating: 4.8 },
                { id: 'BUCiSSyIGGU', channel: 'PHP Master', duration: '2:45:22', views: '2.8M', rating: 4.7 },
                { id: '2eebptXfEvw', channel: 'Web Dev Pro', duration: '1:15:45', views: '1.5M', rating: 4.9 },
                { id: 'BwuLxPH8IDs', channel: 'PHP Expert', duration: '1:32:18', views: '1.2M', rating: 4.6 },
                { id: 'ImtZ5iEN5gk', channel: 'Laravel Pro', duration: '2:45:22', views: '2.1M', rating: 4.8 },
                { id: 'l1W2OwSw5AS', channel: 'PHP Security', duration: '1:28:15', views: '856K', rating: 4.7 },
                { id: 'nW1DSB4A4g8', channel: 'API Master', duration: '1:45:33', views: '1.1M', rating: 4.5 },
                { id: 'fJ9rUzIMcZQ', channel: 'PHP Career', duration: '1:15:27', views: '743K', rating: 4.6 },
                { id: 'RgEzQfqg0Iw', channel: 'PHP Advanced', duration: '2:34:18', views: '567K', rating: 4.9 },
                { id: 'l1W2OwSw5AS', channel: 'PHP Performance', duration: '2:12:45', views: '892K', rating: 4.7 }
            ],
            'swift': [
                { id: 'comgUp0hEX8', channel: 'Swift Tutorial', duration: '1:15:30', views: '2.8M', rating: 4.9 },
                { id: '09TeUXjzpKs', channel: 'iOS Master', duration: '2:45:22', views: '2.2M', rating: 4.8 },
                { id: 'F2ojC6TNwws', channel: 'SwiftUI Pro', duration: '1:15:45', views: '1.8M', rating: 4.9 },
                { id: 'CwA1VWP0Ldw', channel: 'UIKit Expert', duration: '1:32:18', views: '1.5M', rating: 4.6 },
                { id: 'n5X_V81OYnQ', channel: 'iOS Builder', duration: '2:45:22', views: '2.1M', rating: 4.8 },
                { id: 'F2ojC6TNwws', channel: 'Swift Expert', duration: '1:28:15', views: '856K', rating: 4.7 },
                { id: 'CwA1VWP0Ldw', channel: 'App Store Pro', duration: '1:45:33', views: '1.1M', rating: 4.5 },
                { id: 'n5X_V81OYnQ', channel: 'Swift Career', duration: '1:15:27', views: '743K', rating: 4.6 },
                { id: 'F2ojC6TNwws', channel: 'iOS Advanced', duration: '2:34:18', views: '567K', rating: 4.9 },
                { id: 'CwA1VWP0Ldw', channel: 'Swift Performance', duration: '2:12:45', views: '892K', rating: 4.7 }
            ],
            'docker': [
                { id: 'pTFZFxd4hOI', channel: 'Docker Tutorial', duration: '2:10:00', views: '2.1M', rating: 4.8 },
                { id: '3c-iBn73dDE', channel: 'Docker Master', duration: '1:45:30', views: '1.8M', rating: 4.7 },
                { id: 'PziYflu8cB8', channel: 'Container Pro', duration: '1:15:45', views: '956K', rating: 4.9 },
                { id: 'YFl2mCHdv24', channel: 'DevOps Expert', duration: '1:32:18', views: '743K', rating: 4.6 },
                { id: 'kOa_ll_wIDo', channel: 'Docker Builder', duration: '2:45:22', views: '1.2M', rating: 4.8 },
                { id: 'YFl2mCHdv24', channel: 'Docker Academy', duration: '1:28:15', views: '634K', rating: 4.7 },
                { id: 'kOa_ll_wIDo', channel: 'Container Guru', duration: '1:45:33', views: '892K', rating: 4.5 },
                { id: 'YFl2mCHdv24', channel: 'Docker Expert', duration: '1:15:27', views: '567K', rating: 4.6 },
                { id: 'kOa_ll_wIDo', channel: 'DevOps Pro', duration: '2:34:18', views: '423K', rating: 4.9 },
                { id: 'YFl2mCHdv24', channel: 'Docker Mastery', duration: '3:12:45', views: '789K', rating: 4.7 }
            ],
            'default': [
                { id: '_uQrJ0TkZlc', channel: 'Tech Academy', duration: '1:24:15', views: '2.1M', rating: 4.8 },
                { id: 'rfscVS0vtbw', channel: 'Learn Code Online', duration: '2:45:30', views: '1.8M', rating: 4.7 },
                { id: 'WGJJIrtnfpk', channel: 'Programming Pro', duration: '1:15:45', views: '956K', rating: 4.9 },
                { id: 'daefaLgNkw0', channel: 'Code Masters', duration: '1:32:18', views: '743K', rating: 4.6 },
                { id: 'ZDa-Z5JzLYM', channel: 'Project Builder', duration: '2:45:22', views: '1.2M', rating: 4.8 },
                { id: 'Uh2ebFW8OYM', channel: 'Pro Dev', duration: '1:28:15', views: '634K', rating: 4.7 },
                { id: 'vmEHCJofslg', channel: 'Dev Tools', duration: '1:45:33', views: '892K', rating: 4.5 },
                { id: 'ng2o98k983k', channel: 'Career Path', duration: '1:15:27', views: '567K', rating: 4.6 },
                { id: 'MwZwr5Tvyxo', channel: 'Expert Level', duration: '2:34:18', views: '423K', rating: 4.9 },
                { id: 'YQgFBfy02nb', channel: 'Cert Prep', duration: '2:12:45', views: '789K', rating: 4.7 }
            ]
        };
        
        // Get topic-specific videos or default
        const normalizedQuery = query.toLowerCase();
        let videoTemplates = topicVideoMappings.default;
        
        if (normalizedQuery.includes('sql') || normalizedQuery.includes('database') || normalizedQuery.includes('mysql') || normalizedQuery.includes('postgresql')) {
            videoTemplates = topicVideoMappings.sql;
        } else if (normalizedQuery.includes('php')) {
            videoTemplates = topicVideoMappings.php;
        } else if (normalizedQuery.includes('swift') || normalizedQuery.includes('ios')) {
            videoTemplates = topicVideoMappings.swift;
        } else if (normalizedQuery.includes('docker') || normalizedQuery.includes('container') || normalizedQuery.includes('kubernetes')) {
            videoTemplates = topicVideoMappings.docker;
        }
        
        // Generate course-specific learning path
        const learningPath = this.generateLearningPath(capitalizedQuery);
        
        // Generate videos with course-specific titles
        const videos = videoTemplates.map((template, index) => ({
            id: template.id,
            title: this.generateVideoTitle(capitalizedQuery, index),
            channel: template.channel,
            duration: template.duration,
            views: template.views,
            rating: template.rating,
            thumbnail: `https://i.ytimg.com/vi/${template.id}/maxresdefault.jpg`,
            description: this.generateVideoDescription(capitalizedQuery, index),
            difficulty: this.getDifficultyLevel(index),
            topics: this.generateVideoTopics(capitalizedQuery, index)
        }));
        
        return {
            title: `Complete ${capitalizedQuery} Mastery Course`,
            description: `Master ${capitalizedQuery} from fundamentals to advanced concepts with this comprehensive AI-curated learning journey featuring industry-standard practices and real-world applications.`,
            difficulty: 'beginner',
            estimatedHours: Math.floor(Math.random() * 20) + 15, // 15-35 hours
            totalVideos: 10,
            avgRating: 4.5 + Math.random() * 0.4, // 4.5-4.9
            totalViews: (Math.floor(Math.random() * 50) + 10) + 'M', // 10-60M
            learningPath: learningPath,
            videos: videos,
            aiInsights: [
                {
                    title: 'Learning Strategy',
                    content: `${capitalizedQuery} requires consistent practice and hands-on experience. Focus on building projects while learning theoretical concepts.`
                },
                {
                    title: 'Industry Relevance',
                    content: `${capitalizedQuery} is highly sought after in today's market. Master the fundamentals first, then explore advanced applications.`
                },
                {
                    title: 'Practice Recommendation',
                    content: `Build at least 3-5 projects using ${capitalizedQuery} to solidify your understanding and create a strong portfolio.`
                }
            ]
        };
    }
    
    generateLearningPath(topic) {
        const pathTemplates = [
            [`${topic} Fundamentals`, 'Getting Started', 'Core Concepts', 'Practical Examples', 'Intermediate Topics', 'Advanced Techniques', 'Best Practices', 'Real-World Projects', 'Industry Standards', 'Master Level'],
            [`${topic} Basics`, 'Essential Concepts', 'Hands-on Practice', 'Common Patterns', 'Advanced Features', 'Optimization', 'Troubleshooting', 'Real Projects', 'Professional Tips', 'Expert Level'],
            [`${topic} Introduction`, 'Step-by-Step Guide', 'Key Principles', 'Practical Applications', 'Intermediate Skills', 'Advanced Methods', 'Best Practices', 'Project Building', 'Industry Insights', 'Mastery Level'],
            [`${topic} Foundation`, 'Core Knowledge', 'Practical Skills', 'Common Use Cases', 'Intermediate Techniques', 'Advanced Strategies', 'Professional Tips', 'Real-World Projects', 'Industry Standards', 'Expert Mastery']
        ];
        
        return pathTemplates[Math.floor(Math.random() * pathTemplates.length)];
    }
    
    generateVideoTitle(topic, index) {
        const titleTemplates = [
            `${topic} Tutorial - Complete Beginner Course`,
            `Master ${topic} - Full Course`,
            `${topic} Advanced Concepts`,
            `${topic} Best Practices`,
            `Build Projects with ${topic}`,
            `${topic} for Professionals`,
            `${topic} Tools & Libraries`,
            `${topic} Career Guide`,
            `Advanced ${topic} Patterns`,
            `${topic} Certification Prep`
        ];
        
        return titleTemplates[index] || `${topic} Tutorial - Part ${index + 1}`;
    }
    
    generateVideoDescription(topic, index) {
        const descriptions = [
            `Learn ${topic} from absolute basics`,
            `Comprehensive ${topic} course`,
            `Advanced ${topic} techniques`,
            `Industry best practices for ${topic}`,
            `Real-world ${topic} projects`,
            `Professional ${topic} development`,
            `Essential ${topic} tools`,
            `Career opportunities in ${topic}`,
            `Master-level ${topic} patterns`,
            `Prepare for ${topic} certification`
        ];
        
        return descriptions[index] || `Learn ${topic} concepts and techniques`;
    }
    
    getDifficultyLevel(index) {
        if (index < 3) return 'beginner';
        if (index < 6) return 'intermediate';
        return 'advanced';
    }
    
    generateVideoTopics(topic, index) {
        const topicSets = [
            ['basics', 'fundamentals'],
            ['complete course'],
            ['advanced', 'techniques'],
            ['best practices'],
            ['projects', 'practice'],
            ['professional', 'enterprise'],
            ['tools', 'libraries'],
            ['career', 'opportunities'],
            ['patterns', 'advanced'],
            ['certification', 'exam prep']
        ];
        
        return topicSets[index] || ['tutorial', 'learning'];
    }

    delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    displayCourse(courseData) {
        this.updateCourseHeader(courseData);
        this.renderLearningPath(courseData.learningPath);
        this.displayVideos(courseData.videos);
        this.displayAIInsights(courseData.aiInsights);
        this.initializeProgress(courseData);
    }

    updateCourseHeader(courseData) {
        const elements = {
            courseTitle: courseData.title,
            courseDescription: courseData.description,
            totalVideos: courseData.totalVideos,
            totalDuration: courseData.estimatedHours + ' hours',
            avgRating: courseData.avgRating.toFixed(1),
            totalViews: courseData.totalViews
        };

        Object.entries(elements).forEach(([id, value]) => {
            const element = document.getElementById(id);
            if (element) {
                element.textContent = value;
            }
        });
    }

    renderLearningPath(pathItems) {
        const pathContainer = document.getElementById('pathVisualization');
        if (!pathContainer || !pathItems) return;

        pathContainer.innerHTML = '';
        pathItems.forEach((item, index) => {
            const nodeElement = document.createElement('div');
            nodeElement.className = 'path-node';
            nodeElement.innerHTML = `
                <div class="node-icon">
                    <i class="fas fa-${this.getPathIcon(index, pathItems.length)}"></i>
                </div>
                <div class="node-label">${item}</div>
            `;
            pathContainer.appendChild(nodeElement);
        });
    }

    getPathIcon(index, total) {
        const icons = ['play', 'book', 'code', 'cogs', 'rocket', 'trophy', 'star', 'crown'];
        if (index === 0) return 'play';
        if (index === total - 1) return 'trophy';
        return icons[index % icons.length] || 'circle';
    }

    displayVideos(videos) {
        const videosContainer = document.getElementById('videosGrid');
        if (!videosContainer || !videos) return;

        videosContainer.innerHTML = '';
        videos.forEach((video, index) => {
            const videoCard = this.createVideoCard(video, index);
            videosContainer.appendChild(videoCard);
        });
    }

    createVideoCard(video, index) {
        const card = document.createElement('div');
        card.className = 'video-card';
        card.setAttribute('data-video-id', video.id);
        card.innerHTML = `
            <div class="video-thumbnail">
                <img src="${video.thumbnail}" alt="${this.escapeHtml(video.title)}" loading="lazy" onerror="this.src='https://via.placeholder.com/480x360/667eea/ffffff?text=LearnPath+AI'">
                <div class="play-overlay">
                    <i class="fas fa-play"></i>
                </div>
                <div class="video-duration">${video.duration}</div>
            </div>
            <div class="video-content">
                <div class="video-progress">
                    <div class="video-progress-fill" style="width: 0%"></div>
                </div>
                <h4 class="video-title">${video.title}</h4>
                <div class="video-meta">
                    <span class="video-channel"><i class="fas fa-user"></i> ${video.channel}</span>
                    <div class="video-stats">
                        <span><i class="fas fa-eye"></i> ${video.views} views</span>
                        <span><i class="fas fa-star"></i> ${video.rating.toFixed(1)}</span>
                    </div>
                </div>
                <div class="video-actions">
                    <button class="btn btn-primary btn-sm">
                        <i class="fas fa-check"></i> Mark Complete
                    </button>
                    <button class="btn btn-secondary btn-sm">
                        <i class="fas fa-file-alt"></i> AI Notes
                    </button>
                </div>
            </div>
        `;

        // Attach event listeners safely to avoid inline onclick escaping issues
        const self = this;
        setTimeout(() => {
            const thumb = card.querySelector('.video-thumbnail');
            if (thumb) thumb.addEventListener('click', () => self.playVideo(video.id, video.title));

            const completeBtn = card.querySelector('.btn-primary');
            if (completeBtn) completeBtn.addEventListener('click', () => self.markComplete(video.id));

            const notesBtn = card.querySelector('.btn-secondary');
            if (notesBtn) notesBtn.addEventListener('click', () => self.showAINotes(video.id));
        }, 0);

        return card;
    }

    displayAIInsights(insights) {
        const insightsContainer = document.getElementById('aiInsights');
        if (!insightsContainer || !insights) return;

        insightsContainer.innerHTML = '';
        insights.forEach(insight => {
            const insightElement = document.createElement('div');
            insightElement.className = 'insight-item';
            insightElement.innerHTML = `
                <h4><i class="fas fa-lightbulb"></i> ${insight.title}</h4>
                <p>${insight.content}</p>
            `;
            insightsContainer.appendChild(insightElement);
        });
    }

    showLoadingScreen() {
        const loadingSection = document.getElementById('loadingSection');
        const courseSection = document.getElementById('courseSection');
        const searchSection = document.querySelector('.search-section');

        if (loadingSection) loadingSection.classList.add('visible');
        if (courseSection) courseSection.classList.remove('visible');
        if (searchSection) searchSection.style.display = 'none';

        this.animateLoadingSteps();
    }

    hideLoadingScreen() {
        const loadingSection = document.getElementById('loadingSection');
        const searchSection = document.querySelector('.search-section');
        if (loadingSection) loadingSection.classList.remove('visible');
        if (searchSection) searchSection.style.display = 'block';
    }

    showCourseSection() {
        const courseSection = document.getElementById('courseSection');
        if (courseSection) {
            courseSection.classList.add('visible');
            setTimeout(() => {
                courseSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }, 300);
        }
    }

    animateLoadingSteps() {
        const steps = document.querySelectorAll('.step');
        let currentStep = 0;

        const animateStep = () => {
            if (currentStep > 0) {
                steps[currentStep - 1].classList.remove('active');
            }
            if (currentStep < steps.length) {
                steps[currentStep].classList.add('active');
                currentStep++;
                setTimeout(animateStep, CONFIG.LOADING_STEPS_DURATION);
            }
        };

        setTimeout(animateStep, 500);
    }

    playVideo(videoId, title) {
        const modal = document.getElementById('videoModal');
        const iframe = document.getElementById('videoFrame');
        const modalTitle = document.getElementById('modalVideoTitle');

        if (modal && iframe && modalTitle) {
            const embedUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1`;
            iframe.src = embedUrl;
            modalTitle.textContent = title;
            modal.classList.add('visible');
            
            console.log('🎥 Playing video:', title);
        }
    }

    closeModal(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.classList.remove('visible');
            if (modalId === 'videoModal') {
                const iframe = document.getElementById('videoFrame');
                if (iframe) iframe.src = '';
            }
        }
    }

    showAINotes(videoId) {
        const modal = document.getElementById('notesModal');
        const notesContent = document.getElementById('aiNotes');
        
        if (modal && notesContent) {
            const notes = this.generateAINotes(videoId);
            notesContent.innerHTML = notes;
            modal.classList.add('visible');
        }
    }

    generateAINotes(videoId) {
        const tips = [
            'Take breaks every 25-30 minutes to maintain focus',
            'Practice the concepts immediately after watching',
            'Create your own examples based on what you learned',
            'Join online communities to discuss the topics',
            'Build a project using the concepts from this video'
        ];
        
        const randomTip = tips[Math.floor(Math.random() * tips.length)];
        
        return `
            <h4><i class="fas fa-brain"></i> AI-Generated Learning Notes</h4>
            <div class="notes-section">
                <h5>📝 Key Takeaways</h5>
                <ul>
                    <li>Focus on understanding core concepts rather than memorizing syntax</li>
                    <li>Take detailed notes and create your own examples</li>
                    <li>Practice immediately after watching to reinforce learning</li>
                    <li>Don't hesitate to rewatch difficult sections</li>
                </ul>
                
                <h5>🎯 Action Items</h5>
                <ul>
                    <li>Complete any exercises or challenges mentioned in the video</li>
                    <li>Research additional resources on topics that interest you</li>
                    <li>Apply the concepts to a small personal project</li>
                    <li>Share your learning progress with others</li>
                </ul>
                
                <h5>💡 Pro Tip</h5>
                <p><strong>${randomTip}</strong></p>
                
                <h5>🔗 Next Steps</h5>
                <p>After mastering this concept, proceed to the next video in your learning path. Make sure you're comfortable with the current material before advancing.</p>
            </div>
        `;
    }

    markComplete(videoId) {
        if (!this.currentCourse) return;
        if (!this.userProgress[this.currentCourse.title]) this.userProgress[this.currentCourse.title] = {};
        this.userProgress[this.currentCourse.title][videoId] = true;
        this.saveUserProgress();
        this.updateProgressDisplay();

        const card = document.querySelector(`.video-card[data-video-id="${videoId}"]`);
        if (card) {
            const progressFill = card.querySelector('.video-progress-fill');
            const button = card.querySelector('.btn-primary');
            if (progressFill) {
                progressFill.style.width = '100%';
                progressFill.style.background = 'linear-gradient(90deg, #10b981, #34d399)';
            }
            if (button) {
                button.innerHTML = '<i class="fas fa-check"></i> Completed';
                button.style.background = '#10b981';
                button.disabled = true;
            }
        }
        this.showNotification('✅ Video marked as complete!', 'success');
    }

    setupProgressTracking() {
        // Initialize progress tracking system
    }

    loadUserProgress() {
        try {
            const saved = localStorage.getItem('learnpath_progress');
            if (saved) {
                this.userProgress = JSON.parse(saved);
            }
        } catch (error) {
            console.error('Error loading progress:', error);
            this.userProgress = {};
        }
    }

    saveUserProgress() {
        try {
            localStorage.setItem('learnpath_progress', JSON.stringify(this.userProgress));
        } catch (error) {
            console.error('Error saving progress:', error);
        }
    }

    updateProgressDisplay() {
        if (!this.currentCourse) return;
        
        const courseProgress = this.userProgress[this.currentCourse.title] || {};
        const totalVideos = this.currentCourse.totalVideos;
        const completedVideos = Object.keys(courseProgress).length;
        const progressPercentage = Math.round((completedVideos / totalVideos) * 100);

        const progressFill = document.getElementById('progressFill');
        const totalLessons = document.getElementById('totalLessons');
        const estimatedTime = document.getElementById('estimatedTime');

        if (progressFill) {
            progressFill.style.width = `${progressPercentage}%`;
        }
        if (totalLessons) {
            totalLessons.textContent = totalVideos;
        }
        if (estimatedTime) {
            const remainingVideos = totalVideos - completedVideos;
            const estimatedDays = Math.max(1, Math.ceil(remainingVideos / 2)); // Assume 2 videos per day
            estimatedTime.textContent = `${estimatedDays} days`;
        }
        
        // Update the progress stats text
        const progressStats = document.querySelector('.progress-stats span:first-child');
        if (progressStats) {
            progressStats.innerHTML = `<strong>${completedVideos}</strong> of <span id="totalLessons">${totalVideos}</span> completed`;
        }
    }

    initializeProgress(courseData) {
        this.updateProgressDisplay();
    }

    handleKeyboardShortcuts(e) {
        // Ctrl+K to focus search
        if (e.ctrlKey && e.key === 'k') {
            e.preventDefault();
            const searchInput = document.getElementById('searchInput');
            if (searchInput) {
                searchInput.focus();
                searchInput.select();
            }
        }
        
        // Escape to close modals
        if (e.key === 'Escape') {
            this.closeModal('videoModal');
            this.closeModal('notesModal');
        }
    }

    handleProgressButtons(e) {
        // Handle any dynamic button clicks
        if (e.target.matches('.suggestion-tag')) {
            const topic = e.target.textContent;
            document.getElementById('searchInput').value = topic;
        }
    }

    showNotification(message, type = 'info') {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <i class="fas fa-${type === 'success' ? 'check' : type === 'error' ? 'exclamation' : 'info'}-circle"></i>
            <span>${message}</span>
        `;
        
        // Add to page
        document.body.appendChild(notification);
        
        // Show notification
        setTimeout(() => notification.classList.add('show'), 100);
        
        // Hide and remove notification
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }, 3000);
        
        console.log(`📢 ${type.toUpperCase()}: ${message}`);
    }

    // Add professional analytics tracking
    trackEvent(eventName, properties = {}) {
        console.log(`📊 Analytics: ${eventName}`, properties);
        // In a real app, you'd send this to analytics service
    }

    // Add professional error handling
    handleError(error, context = '') {
        console.error(`❌ Error in ${context}:`, error);
        this.showNotification(`Something went wrong. Please try again.`, 'error');
        this.trackEvent('error', { context, message: error.message });
    }

    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    // Generate AI Quiz
    generateQuiz() {
        if (!this.currentCourse) {
            this.showNotification('Please generate a course first!', 'warning');
            return;
        }

        const quizContainer = document.getElementById('quizContainer');
        if (!quizContainer) return;

        const quiz = this.createQuiz(this.currentCourse.title);
        quizContainer.innerHTML = quiz;
        
        this.showNotification('AI Quiz generated! Test your knowledge!', 'success');
    }

    createQuiz(courseTitle) {
        const questions = [
            {
                question: `What is the main purpose of ${courseTitle}?`,
                options: [
                    'To solve complex problems',
                    'To create user interfaces',
                    'To manage databases',
                    'To optimize performance'
                ],
                correct: 0
            },
            {
                question: `Which of the following is a key concept in ${courseTitle}?`,
                options: [
                    'Variables and data types',
                    'Color theory',
                    'Music composition',
                    'Cooking techniques'
                ],
                correct: 0
            },
            {
                question: `What should you focus on when learning ${courseTitle}?`,
                options: [
                    'Memorizing syntax only',
                    'Understanding concepts and practicing',
                    'Reading documentation only',
                    'Watching videos only'
                ],
                correct: 1
            },
            {
                question: `Which is the best way to master ${courseTitle}?`,
                options: [
                    'Reading books only',
                    'Building projects and practicing',
                    'Watching one video',
                    'Attending one class'
                ],
                correct: 1
            },
            {
                question: `What makes ${courseTitle} valuable in today's market?`,
                options: [
                    'It\'s easy to learn',
                    'It\'s highly sought after by employers',
                    'It\'s free to use',
                    'It\'s fun to work with'
                ],
                correct: 1
            }
        ];

        let quizHTML = '<div class="quiz-questions">';
        
        questions.forEach((q, index) => {
            quizHTML += `
                <div class="quiz-question" data-question="${index}">
                    <h4>Question ${index + 1}: ${q.question}</h4>
                    <div class="quiz-options">
                        ${q.options.map((option, optIndex) => `
                            <label class="quiz-option">
                                <input type="radio" name="question${index}" value="${optIndex}">
                                <span>${option}</span>
                            </label>
                        `).join('')}
                    </div>
                </div>
            `;
        });

        quizHTML += `
            </div>
            <div class="quiz-actions">
                <button class="btn btn-primary" onclick="app.checkQuiz()">
                    <i class="fas fa-check"></i> Check Answers
                </button>
                <button class="btn btn-secondary" onclick="app.resetQuiz()">
                    <i class="fas fa-redo"></i> Reset Quiz
                </button>
            </div>
            <div class="quiz-results" id="quizResults" style="display: none;">
                <h4>Quiz Results</h4>
                <div class="quiz-score" id="quizScore"></div>
                <div class="quiz-feedback" id="quizFeedback"></div>
            </div>
        `;

        return quizHTML;
    }

    checkQuiz() {
        const questions = document.querySelectorAll('.quiz-question');
        let correctAnswers = 0;
        let totalQuestions = questions.length;

        questions.forEach((question, index) => {
            const selectedOption = question.querySelector('input[type="radio"]:checked');
            const questionData = question.dataset.question;
            
            if (selectedOption) {
                const selectedValue = parseInt(selectedOption.value);
                const correctValue = this.getCorrectAnswer(questionData);
                
                if (selectedValue === correctValue) {
                    correctAnswers++;
                    question.classList.add('correct');
                } else {
                    question.classList.add('incorrect');
                }
            } else {
                question.classList.add('unanswered');
            }
        });

        const score = Math.round((correctAnswers / totalQuestions) * 100);
        this.displayQuizResults(score, correctAnswers, totalQuestions);
    }

    getCorrectAnswer(questionIndex) {
        const correctAnswers = [0, 0, 1, 1, 1]; // Based on the quiz structure
        return correctAnswers[questionIndex] || 0;
    }

    displayQuizResults(score, correct, total) {
        const resultsDiv = document.getElementById('quizResults');
        const scoreDiv = document.getElementById('quizScore');
        const feedbackDiv = document.getElementById('quizFeedback');

        if (resultsDiv && scoreDiv && feedbackDiv) {
            resultsDiv.style.display = 'block';
            
            scoreDiv.innerHTML = `
                <div class="score-circle ${score >= 80 ? 'excellent' : score >= 60 ? 'good' : 'needs-improvement'}">
                    <span class="score-number">${score}%</span>
                    <span class="score-label">Score</span>
                </div>
                <p>You got ${correct} out of ${total} questions correct!</p>
            `;

            let feedback = '';
            if (score >= 80) {
                feedback = 'Excellent! You have a strong understanding of this topic. Keep up the great work!';
            } else if (score >= 60) {
                feedback = 'Good job! You understand the basics. Consider reviewing some concepts and practicing more.';
            } else {
                feedback = 'Keep learning! Review the course materials and try the quiz again. Practice makes perfect!';
            }

            feedbackDiv.innerHTML = `<p>${feedback}</p>`;
        }

        this.showNotification(`Quiz completed! Score: ${score}%`, 'success');
    }

    resetQuiz() {
        const quizContainer = document.getElementById('quizContainer');
        if (quizContainer) {
            const questions = quizContainer.querySelectorAll('.quiz-question');
            questions.forEach(question => {
                question.classList.remove('correct', 'incorrect', 'unanswered');
                const inputs = question.querySelectorAll('input[type="radio"]');
                inputs.forEach(input => input.checked = false);
            });

            const resultsDiv = document.getElementById('quizResults');
            if (resultsDiv) {
                resultsDiv.style.display = 'none';
            }
        }
    }

    // Generate Interactive Notes
    generateInteractiveNotes() {
        if (!this.currentCourse) {
            this.showNotification('Please generate a course first!', 'warning');
            return;
        }

        const notesContainer = document.getElementById('notesContainer');
        if (!notesContainer) return;

        const notes = this.createInteractiveNotes(this.currentCourse.title);
        notesContainer.innerHTML = notes;
        
        this.showNotification('Interactive notes generated! Start taking notes!', 'success');
    }

    createInteractiveNotes(courseTitle) {
        return `
            <div class="interactive-notes">
                <div class="notes-header">
                    <h4>${courseTitle} - Learning Notes</h4>
                    <div class="notes-actions">
                        <button class="btn btn-sm btn-primary" onclick="app.addNote()">
                            <i class="fas fa-plus"></i> Add Note
                        </button>
                        <button class="btn btn-sm btn-secondary" onclick="app.exportNotes()">
                            <i class="fas fa-download"></i> Export
                        </button>
                    </div>
                </div>
                
                <div class="notes-content">
                    <div class="note-item">
                        <div class="note-header">
                            <input type="text" placeholder="Note title..." class="note-title" value="Key Concepts">
                            <button class="btn btn-sm btn-danger" onclick="this.parentElement.parentElement.remove()">
                                <i class="fas fa-trash"></i>
                            </button>
                        </div>
                        <textarea class="note-content" placeholder="Write your notes here...">• Start with the basics
• Practice regularly
• Build projects
• Join communities
• Stay updated with latest trends</textarea>
                    </div>
                    
                    <div class="note-item">
                        <div class="note-header">
                            <input type="text" placeholder="Note title..." class="note-title" value="Important Resources">
                            <button class="btn btn-sm btn-danger" onclick="this.parentElement.parentElement.remove()">
                                <i class="fas fa-trash"></i>
                            </button>
                        </div>
                        <textarea class="note-content" placeholder="Write your notes here...">• Official documentation
• Online tutorials
• Practice platforms
• Community forums
• Books and courses</textarea>
                    </div>
                </div>
                
                <div class="notes-summary">
                    <h5>Learning Summary</h5>
                    <div class="summary-stats">
                        <div class="stat">
                            <span class="stat-number" id="totalNotes">2</span>
                            <span class="stat-label">Notes</span>
                        </div>
                        <div class="stat">
                            <span class="stat-number" id="totalWords">0</span>
                            <span class="stat-label">Words</span>
                        </div>
                        <div class="stat">
                            <span class="stat-number" id="lastUpdated">Just now</span>
                            <span class="stat-label">Last Updated</span>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    addNote() {
        const notesContent = document.querySelector('.notes-content');
        if (notesContent) {
            const noteItem = document.createElement('div');
            noteItem.className = 'note-item';
            noteItem.innerHTML = `
                <div class="note-header">
                    <input type="text" placeholder="Note title..." class="note-title">
                    <button class="btn btn-sm btn-danger" onclick="this.parentElement.parentElement.remove()">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
                <textarea class="note-content" placeholder="Write your notes here..."></textarea>
            `;
            notesContent.appendChild(noteItem);
            this.updateNotesStats();
        }
    }

    exportNotes() {
        const notes = document.querySelectorAll('.note-item');
        let exportText = `# ${this.currentCourse?.title || 'Course'} - Learning Notes\n\n`;
        
        notes.forEach((note, index) => {
            const title = note.querySelector('.note-title').value || `Note ${index + 1}`;
            const content = note.querySelector('.note-content').value;
            exportText += `## ${title}\n${content}\n\n`;
        });
        
        const blob = new Blob([exportText], { type: 'text/markdown' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${this.currentCourse?.title || 'course'}-notes.md`;
        a.click();
        URL.revokeObjectURL(url);
        
        this.showNotification('Notes exported successfully!', 'success');
    }

    updateNotesStats() {
        const notes = document.querySelectorAll('.note-item');
        const totalNotes = notes.length;
        
        let totalWords = 0;
        notes.forEach(note => {
            const content = note.querySelector('.note-content').value;
            totalWords += content.split(' ').filter(word => word.length > 0).length;
        });
        
        const totalNotesEl = document.getElementById('totalNotes');
        const totalWordsEl = document.getElementById('totalWords');
        
        if (totalNotesEl) totalNotesEl.textContent = totalNotes;
        if (totalWordsEl) totalWordsEl.textContent = totalWords;
    }
}

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.app = new LearnPathAI();
});

// Fallback initialization
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        if (!window.app) window.app = new LearnPathAI();
    });
} else {
    window.app = new LearnPathAI();
}
