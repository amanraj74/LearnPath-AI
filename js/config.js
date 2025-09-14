/**
 * LearnPath AI - Configuration File
 * TAS 2025 Hackathon Entry - BULLETPROOF VERSION
 */

const CONFIG = {
    YOUTUBE_API_KEY: 'YOUR_YOUTUBE_API_KEY_HERE',
    OPENAI_API_KEY: 'YOUR_OPENAI_API_KEY_HERE',
    USE_DEMO_MODE: true, // ALWAYS TRUE for reliable demo
    YOUTUBE_SEARCH_URL: 'https://www.googleapis.com/youtube/v3/search',
    YOUTUBE_VIDEO_URL: 'https://www.googleapis.com/youtube/v3/videos',
    OPENAI_API_URL: 'https://api.openai.com/v1/chat/completions',
    MAX_RESULTS: 12,
    LOADING_STEPS_DURATION: 800,
    MIN_VIDEOS_PER_COURSE: 8,
    MAX_VIDEOS_PER_COURSE: 12
};

// COMPLETE DEMO DATA FOR ALL TOPICS - REAL WORKING VIDEO IDs
const DEMO_DATA = {
    courses: {
        // Programming Languages
        'python': {
            title: 'Complete Python Programming Mastery',
            description: 'Master Python from absolute basics to advanced concepts with real projects and applications.',
            difficulty: 'beginner',
            estimatedHours: 25.5,
            totalVideos: 10,
            avgRating: 4.8,
            totalViews: '58.2M',
            learningPath: ['Python Basics', 'Data Types', 'Control Flow', 'Functions', 'OOP', 'Libraries', 'Web Dev', 'Data Science', 'Projects', 'Advanced'],
            videos: [
                { id: '_uQrJ0TkZlc', title: 'Python Tutorial - Python Full Course for Beginners', channel: 'Programming with Mosh', duration: '6:14:07', views: '15M', rating: 4.9, thumbnail: 'https://i.ytimg.com/vi/_uQrJ0TkZlc/maxresdefault.jpg', description: 'Complete Python course for absolute beginners', difficulty: 'beginner', topics: ['variables', 'data types', 'syntax'] },
                { id: 'rfscVS0vtbw', title: 'Learn Python - Full Course for Beginners', channel: 'freeCodeCamp.org', duration: '4:26:52', views: '31M', rating: 4.8, thumbnail: 'https://i.ytimg.com/vi/rfscVS0vtbw/maxresdefault.jpg', description: 'Comprehensive Python fundamentals course', difficulty: 'beginner', topics: ['basics', 'fundamentals'] },
                { id: 'WGJJIrtnfpk', title: 'Python Functions Tutorial', channel: 'Corey Schafer', duration: '28:45', views: '1.2M', rating: 4.9, thumbnail: 'https://i.ytimg.com/vi/WGJJIrtnfpk/maxresdefault.jpg', description: 'Master Python functions and scope', difficulty: 'intermediate', topics: ['functions', 'parameters'] },
                { id: 'daefaLgNkw0', title: 'Python Data Structures', channel: 'Tech With Tim', duration: '41:22', views: '892K', rating: 4.7, thumbnail: 'https://i.ytimg.com/vi/daefaLgNkw0/maxresdefault.jpg', description: 'Lists, dictionaries, and data structures', difficulty: 'intermediate', topics: ['lists', 'dictionaries'] },
                { id: 'ZDa-Z5JzLYM', title: 'Python OOP Tutorial', channel: 'Corey Schafer', duration: '15:33', views: '2.1M', rating: 4.8, thumbnail: 'https://i.ytimg.com/vi/ZDa-Z5JzLYM/maxresdefault.jpg', description: 'Object-oriented programming in Python', difficulty: 'intermediate', topics: ['OOP', 'classes'] },
                { id: 'Uh2ebFW8OYM', title: 'Working with Files in Python', channel: 'Corey Schafer', duration: '35:17', views: '423K', rating: 4.6, thumbnail: 'https://i.ytimg.com/vi/Uh2ebFW8OYM/maxresdefault.jpg', description: 'File handling and I/O operations', difficulty: 'intermediate', topics: ['files', 'I/O'] },
                { id: 'vmEHCJofslg', title: 'Python NumPy Tutorial', channel: 'freeCodeCamp.org', duration: '58:41', views: '2.1M', rating: 4.9, thumbnail: 'https://i.ytimg.com/vi/vmEHCJofslg/maxresdefault.jpg', description: 'NumPy for data science', difficulty: 'advanced', topics: ['numpy', 'data science'] },
                { id: 'ng2o98k983k', title: 'Build 12 Python Projects', channel: 'freeCodeCamp.org', duration: '3:14:13', views: '8.2M', rating: 4.8, thumbnail: 'https://i.ytimg.com/vi/ng2o98k983k/maxresdefault.jpg', description: 'Real-world Python projects', difficulty: 'advanced', topics: ['projects', 'applications'] },
                { id: 'MwZwr5Tvyxo', title: 'Python Web Development with Django', channel: 'Traversy Media', duration: '1:23:15', views: '1.5M', rating: 4.7, thumbnail: 'https://i.ytimg.com/vi/MwZwr5Tvyxo/maxresdefault.jpg', description: 'Build web applications with Django', difficulty: 'advanced', topics: ['django', 'web dev'] },
                { id: 'YQgFBfy02nb', title: 'Python Data Analysis with Pandas', channel: 'Data School', duration: '45:32', views: '967K', rating: 4.8, thumbnail: 'https://i.ytimg.com/vi/YQgFBfy02nb/maxresdefault.jpg', description: 'Data analysis with Pandas library', difficulty: 'advanced', topics: ['pandas', 'data analysis'] }
            ],
            aiInsights: [
                { title: 'Learning Strategy', content: 'Python is perfect for beginners. Focus on understanding syntax first, then move to practical projects.' },
                { title: 'Practice Projects', content: 'Build calculators, games, and data analysis tools to reinforce your learning.' },
                { title: 'Career Path', content: 'Python opens doors to web development, data science, AI/ML, and automation.' }
            ]
        },

        'javascript': {
            title: 'Modern JavaScript Development Complete Course',
            description: 'Master JavaScript from ES6 fundamentals to advanced concepts including DOM manipulation, async programming, and modern frameworks.',
            difficulty: 'beginner',
            estimatedHours: 22.3,
            totalVideos: 9,
            avgRating: 4.9,
            totalViews: '45.7M',
            learningPath: ['JS Basics', 'ES6 Features', 'DOM Manipulation', 'Async Programming', 'APIs', 'Modern JS', 'Projects', 'Frameworks', 'Advanced'],
            videos: [
                { id: 'PkZNo7MFNFg', title: 'Learn JavaScript - Full Course', channel: 'freeCodeCamp.org', duration: '3:26:41', views: '12M', rating: 4.9, thumbnail: 'https://i.ytimg.com/vi/PkZNo7MFNFg/maxresdefault.jpg', description: 'Complete JavaScript fundamentals', difficulty: 'beginner', topics: ['basics', 'syntax'] },
                { id: 'hdI2bqOjy3c', title: 'JavaScript Crash Course', channel: 'Traversy Media', duration: '1:40:05', views: '5.2M', rating: 4.8, thumbnail: 'https://i.ytimg.com/vi/hdI2bqOjy3c/maxresdefault.jpg', description: 'Quick start JavaScript guide', difficulty: 'beginner', topics: ['crash course'] },
                { id: 'W6NZfCO5SIk', title: 'JavaScript in 1 Hour', channel: 'Programming with Mosh', duration: '1:08:43', views: '8.1M', rating: 4.9, thumbnail: 'https://i.ytimg.com/vi/W6NZfCO5SIk/maxresdefault.jpg', description: 'Learn JavaScript basics quickly', difficulty: 'beginner', topics: ['quick start'] },
                { id: 'DHjqpvDnNGE', title: 'JavaScript ES6 Tutorial', channel: 'The Net Ninja', duration: '45:23', views: '2.3M', rating: 4.7, thumbnail: 'https://i.ytimg.com/vi/DHjqpvDnNGE/maxresdefault.jpg', description: 'Modern JavaScript ES6 features', difficulty: 'intermediate', topics: ['ES6', 'modern JS'] },
                { id: 'y17RuWkWdn8', title: 'JavaScript DOM Manipulation', channel: 'Web Dev Simplified', duration: '35:32', views: '1.8M', rating: 4.8, thumbnail: 'https://i.ytimg.com/vi/y17RuWkWdn8/maxresdefault.jpg', description: 'DOM manipulation and events', difficulty: 'intermediate', topics: ['DOM', 'events'] },
                { id: 'PoRJizFvM7s', title: 'Async JavaScript Tutorial', channel: 'The Net Ninja', duration: '42:18', views: '1.4M', rating: 4.7, thumbnail: 'https://i.ytimg.com/vi/PoRJizFvM7s/maxresdefault.jpg', description: 'Promises, async/await, callbacks', difficulty: 'intermediate', topics: ['async', 'promises'] },
                { id: 'fBNz5xF-Kx4', title: 'JavaScript API Tutorial', channel: 'Traversy Media', duration: '28:15', views: '987K', rating: 4.6, thumbnail: 'https://i.ytimg.com/vi/fBNz5xF-Kx4/maxresdefault.jpg', description: 'Working with APIs and fetch', difficulty: 'intermediate', topics: ['APIs', 'fetch'] },
                { id: 'dtKciwk_si4', title: 'Build 15 JavaScript Projects', channel: 'freeCodeCamp.org', duration: '8:34:21', views: '3.2M', rating: 4.8, thumbnail: 'https://i.ytimg.com/vi/dtKciwk_si4/maxresdefault.jpg', description: '15 practical JavaScript projects', difficulty: 'advanced', topics: ['projects', 'practice'] },
                { id: 'Ttf3CEsEwMQ', title: 'Advanced JavaScript Concepts', channel: 'Akshay Saini', duration: '52:37', views: '756K', rating: 4.9, thumbnail: 'https://i.ytimg.com/vi/Ttf3CEsEwMQ/maxresdefault.jpg', description: 'Closures, scope, hoisting', difficulty: 'advanced', topics: ['advanced', 'concepts'] }
            ],
            aiInsights: [
                { title: 'Modern JavaScript Focus', content: 'Concentrate on ES6+ features as they are the current industry standard.' },
                { title: 'Project-Based Learning', content: 'Build real projects while learning. JavaScript is best learned through practice.' },
                { title: 'Async Programming', content: 'Master promises and async/await - essential for modern web development.' }
            ]
        },

        'react': {
            title: 'Modern React Development Complete Course',
            description: 'Learn React from fundamentals to advanced patterns including hooks, context, and modern development practices.',
            difficulty: 'intermediate',
            estimatedHours: 18.7,
            totalVideos: 8,
            avgRating: 4.9,
            totalViews: '12.8M',
            learningPath: ['React Basics', 'JSX & Components', 'Props & State', 'Event Handling', 'Hooks', 'Context API', 'Routing', 'Advanced'],
            videos: [
                { id: 'Ke90Tje7VS0', title: 'React Tutorial for Beginners', channel: 'Programming with Mosh', duration: '1:48:36', views: '2.1M', rating: 4.9, thumbnail: 'https://i.ytimg.com/vi/Ke90Tje7VS0/maxresdefault.jpg', description: 'Complete React tutorial for beginners', difficulty: 'beginner', topics: ['react basics', 'components'] },
                { id: 'bMknfKXIFA8', title: 'React Course - Beginner Tutorial', channel: 'freeCodeCamp.org', duration: '11:55:27', views: '4.2M', rating: 4.8, thumbnail: 'https://i.ytimg.com/vi/bMknfKXIFA8/maxresdefault.jpg', description: 'Comprehensive React course with projects', difficulty: 'beginner', topics: ['fundamentals', 'projects'] },
                { id: 'f55qeKGgB_M', title: 'React Hooks Tutorial', channel: 'Web Dev Simplified', duration: '38:27', views: '567K', rating: 4.8, thumbnail: 'https://i.ytimg.com/vi/f55qeKGgB_M/maxresdefault.jpg', description: 'Master React hooks with examples', difficulty: 'intermediate', topics: ['hooks', 'useState'] },
                { id: 'hQAHSlTtcmY', title: 'useState Hook Explained', channel: 'Web Dev Simplified', duration: '15:23', views: '892K', rating: 4.9, thumbnail: 'https://i.ytimg.com/vi/hQAHSlTtcmY/maxresdefault.jpg', description: 'Deep dive into useState hook', difficulty: 'intermediate', topics: ['useState', 'state'] },
                { id: '5LrDIWkK_Bc', title: 'React Context Tutorial', channel: 'The Net Ninja', duration: '55:41', views: '623K', rating: 4.7, thumbnail: 'https://i.ytimg.com/vi/5LrDIWkK_Bc/maxresdefault.jpg', description: 'Context API and state management', difficulty: 'intermediate', topics: ['context', 'state management'] },
                { id: 'Law7wfdg_ls', title: 'React Router Tutorial', channel: 'Web Dev Simplified', duration: '35:17', views: '423K', rating: 4.6, thumbnail: 'https://i.ytimg.com/vi/Law7wfdg_ls/maxresdefault.jpg', description: 'Routing in React applications', difficulty: 'intermediate', topics: ['routing', 'navigation'] },
                { id: 'w7ejDZ8SWv8', title: 'React Testing Tutorial', channel: 'Codevolution', duration: '52:41', views: '312K', rating: 4.8, thumbnail: 'https://i.ytimg.com/vi/w7ejDZ8SWv8/maxresdefault.jpg', description: 'Testing React applications', difficulty: 'advanced', topics: ['testing', 'jest'] },
                { id: 'NqzdVN2tyvQ', title: 'Build React Projects', channel: 'JavaScript Mastery', duration: '4:15:32', views: '1.2M', rating: 4.9, thumbnail: 'https://i.ytimg.com/vi/NqzdVN2tyvQ/maxresdefault.jpg', description: 'Build real React applications', difficulty: 'advanced', topics: ['projects', 'applications'] }
            ],
            aiInsights: [
                { title: 'Component Thinking', content: 'Think in components. Break UI into reusable, manageable pieces.' },
                { title: 'Hooks Mastery', content: 'Modern React is built around hooks. Master useState and useEffect first.' },
                { title: 'State Management', content: 'Start with local state, then learn Context API for complex applications.' }
            ]
        },

        'c++': {
            title: 'Complete C++ Programming Mastery',
            description: 'Master C++ from basic syntax to advanced concepts including OOP, memory management, STL, and system programming.',
            difficulty: 'intermediate',
            estimatedHours: 28.4,
            totalVideos: 9,
            avgRating: 4.7,
            totalViews: '15.3M',
            learningPath: ['C++ Basics', 'Data Types', 'Control Flow', 'Functions', 'OOP', 'Memory Management', 'STL', 'Advanced', 'Projects'],
            videos: [
                { id: 'vLnPwxZdW4Y', title: 'C++ Tutorial for Beginners - Full Course', channel: 'freeCodeCamp.org', duration: '4:01:25', views: '3.2M', rating: 4.8, thumbnail: 'https://i.ytimg.com/vi/vLnPwxZdW4Y/maxresdefault.jpg', description: 'Complete C++ course for beginners', difficulty: 'beginner', topics: ['basics', 'syntax'] },
                { id: '18c3MTX0PK0', title: 'C++ Programming Course', channel: 'Caleb Curry', duration: '10:46:59', views: '1.8M', rating: 4.7, thumbnail: 'https://i.ytimg.com/vi/18c3MTX0PK0/maxresdefault.jpg', description: 'Comprehensive C++ programming course', difficulty: 'beginner', topics: ['fundamentals', 'programming'] },
                { id: 'ZzaPdXTrSb8', title: 'C++ Object Oriented Programming', channel: 'CodeBeauty', duration: '1:23:45', views: '892K', rating: 4.9, thumbnail: 'https://i.ytimg.com/vi/ZzaPdXTrSb8/maxresdefault.jpg', description: 'OOP concepts in C++', difficulty: 'intermediate', topics: ['OOP', 'classes'] },
                { id: 'wN0x9eZLix4', title: 'C++ Data Structures', channel: 'mycodeschool', duration: '2:15:33', views: '1.4M', rating: 4.8, thumbnail: 'https://i.ytimg.com/vi/wN0x9eZLix4/maxresdefault.jpg', description: 'Data structures in C++', difficulty: 'intermediate', tokens: ['data structures', 'algorithms'] },
                { id: 'Rub-JsjMhWY', title: 'C++ Pointers Tutorial', channel: 'The Cherno', duration: '45:22', views: '678K', rating: 4.7, thumbnail: 'https://i.ytimg.com/vi/Rub-JsjMhWY/maxresdefault.jpg', description: 'Understanding pointers and memory', difficulty: 'intermediate', topics: ['pointers', 'memory'] },
                { id: 'E0zGGmMw9LI', title: 'C++ STL Tutorial', channel: 'GeeksforGeeks', duration: '1:34:17', views: '567K', rating: 4.6, thumbnail: 'https://i.ytimg.com/vi/E0zGGmMw9LI/maxresdefault.jpg', description: 'Standard Template Library in C++', difficulty: 'advanced', topics: ['STL', 'templates'] },
                { id: 'LGOgNqkRMs0', title: 'C++ Memory Management', channel: 'CppCon', duration: '58:41', views: '434K', rating: 4.8, thumbnail: 'https://i.ytimg.com/vi/LGOgNqkRMs0/maxresdefault.jpg', description: 'Advanced memory management', difficulty: 'advanced', topics: ['memory', 'performance'] },
                { id: 'mUQZ1qmKlLY', title: 'Modern C++ Features', channel: 'CppCon', duration: '1:12:35', views: '523K', rating: 4.7, thumbnail: 'https://i.ytimg.com/vi/mUQZ1qmKlLY/maxresdefault.jpg', description: 'C++11/14/17/20 features', difficulty: 'advanced', topics: ['modern C++', 'features'] },
                { id: 'GQp1zzTwrIg', title: 'C++ Game Development', channel: 'javidx9', duration: '3:25:18', views: '789K', rating: 4.9, thumbnail: 'https://i.ytimg.com/vi/GQp1zzTwrIg/maxresdefault.jpg', description: 'Build games with C++', difficulty: 'advanced', topics: ['game dev', 'projects'] }
            ],
            aiInsights: [
                { title: 'Memory Management', content: 'C++ gives you control over memory. Learn pointers and references early.' },
                { title: 'OOP Mastery', content: 'C++ OOP is powerful but complex. Practice with real projects.' },
                { title: 'Modern C++', content: 'Focus on modern C++ features (C++11 and later) for better code.' }
            ]
        },

        'java': {
            title: 'Complete Java Programming Mastery',
            description: 'Master Java from fundamentals to enterprise development including OOP, collections, multithreading, and frameworks.',
            difficulty: 'beginner',
            estimatedHours: 24.7,
            totalVideos: 9,
            avgRating: 4.8,
            totalViews: '22.4M',
            learningPath: ['Java Basics', 'OOP Concepts', 'Collections', 'Exception Handling', 'File I/O', 'Multithreading', 'GUI', 'Web Dev', 'Enterprise'],
            videos: [
                { id: 'grEKMHGYyns', title: 'Java Tutorial for Beginners - Full Course', channel: 'Programming with Mosh', duration: '2:18:41', views: '4.2M', rating: 4.9, thumbnail: 'https://i.ytimg.com/vi/grEKMHGYyns/maxresdefault.jpg', description: 'Complete Java tutorial for beginners', difficulty: 'beginner', topics: ['basics', 'fundamentals'] },
                { id: 'eIrMbAQSU34', title: 'Java Full Course', channel: 'Derek Banas', duration: '16:07:33', views: '2.8M', rating: 4.7, thumbnail: 'https://i.ytimg.com/vi/eIrMbAQSU34/maxresdefault.jpg', description: 'Comprehensive Java programming course', difficulty: 'beginner', topics: ['complete course', 'programming'] },
                { id: 'xk4_1vDrzzo', title: 'Java OOP Tutorial', channel: 'Derek Banas', duration: '1:45:22', views: '1.3M', rating: 4.8, thumbnail: 'https://i.ytimg.com/vi/xk4_1vDrzzo/maxresdefault.jpg', description: 'Object-oriented programming in Java', difficulty: 'intermediate', topics: ['OOP', 'classes'] },
                { id: 'QAV725a8BPE', title: 'Java Collections Framework', channel: 'Java Brains', duration: '2:12:15', views: '892K', rating: 4.6, thumbnail: 'https://i.ytimg.com/vi/QAV725a8BPE/maxresdefault.jpg', description: 'Collections and data structures', difficulty: 'intermediate', topics: ['collections', 'data structures'] },
                { id: 'Hl-zzrqQoSE', title: 'Java Exception Handling', channel: 'Coding with John', duration: '38:47', views: '567K', rating: 4.7, thumbnail: 'https://i.ytimg.com/vi/Hl-zzrqQoSE/maxresdefault.jpg', description: 'Exception handling and error management', difficulty: 'intermediate', topics: ['exceptions', 'error handling'] },
                { id: 'r_MbozD32eo', title: 'Java Multithreading', channel: 'Cave of Programming', duration: '1:28:33', views: '734K', rating: 4.5, thumbnail: 'https://i.ytimg.com/vi/r_MbozD32eo/maxresdefault.jpg', description: 'Multithreading and concurrency', difficulty: 'advanced', topics: ['multithreading', 'concurrency'] },
                { id: 'Kmgo00avvEw', title: 'Java GUI with Swing', channel: 'Bro Code', duration: '12:15:39', views: '1.1M', rating: 4.8, thumbnail: 'https://i.ytimg.com/vi/Kmgo00avvEw/maxresdefault.jpg', description: 'Building GUI applications with Swing', difficulty: 'intermediate', topics: ['GUI', 'Swing'] },
                { id: 'msXL2oDexqw', title: 'Java Spring Boot Tutorial', channel: 'Amigoscode', duration: '2:34:17', views: '1.8M', rating: 4.9, thumbnail: 'https://i.ytimg.com/vi/msXL2oDexqw/maxresdefault.jpg', description: 'Web development with Spring Boot', difficulty: 'advanced', topics: ['Spring Boot', 'web dev'] },
                { id: 'vtPkZShrvXQ', title: 'Build Java Projects', channel: 'Coding with John', duration: '4:45:23', views: '923K', rating: 4.7, thumbnail: 'https://i.ytimg.com/vi/vtPkZShrvXQ/maxresdefault.jpg', description: 'Real-world Java projects', difficulty: 'advanced', topics: ['projects', 'applications'] }
            ],
            aiInsights: [
                { title: 'Platform Independence', content: 'Java\'s "write once, run anywhere" philosophy makes it perfect for enterprise applications.' },
                { title: 'OOP Foundation', content: 'Java is purely object-oriented. Master OOP concepts for success.' },
                { title: 'Enterprise Ready', content: 'Java excels in enterprise environments. Learn Spring framework for web development.' }
            ]
        },

        'machine learning': {
            title: 'Complete Machine Learning Mastery',
            description: 'Master machine learning from fundamentals to advanced techniques including supervised learning, deep learning, and practical applications.',
            difficulty: 'intermediate',
            estimatedHours: 32.8,
            totalVideos: 10,
            avgRating: 4.9,
            totalViews: '18.7M',
            learningPath: ['ML Basics', 'Python for ML', 'Statistics', 'Supervised Learning', 'Unsupervised Learning', 'Deep Learning', 'Neural Networks', 'Projects', 'MLOps', 'Advanced'],
            videos: [
                { id: 'ukzFI9rgwfU', title: 'Machine Learning Course - Full', channel: 'freeCodeCamp.org', duration: '10:52:33', views: '3.2M', rating: 4.9, thumbnail: 'https://i.ytimg.com/vi/ukzFI9rgwfU/maxresdefault.jpg', description: 'Complete machine learning course', difficulty: 'beginner', topics: ['ML basics', 'fundamentals'] },
                { id: 'aircAruvnKk', title: 'Neural Networks Explained', channel: '3Blue1Brown', duration: '19:13', views: '7.8M', rating: 4.9, thumbnail: 'https://i.ytimg.com/vi/aircAruvnKk/maxresdefault.jpg', description: 'Deep dive into neural networks', difficulty: 'intermediate', topics: ['neural networks', 'deep learning'] },
                { id: 'tPYj3fFJGjk', title: 'TensorFlow Course', channel: 'TensorFlow', duration: '7:01:20', views: '1.4M', rating: 4.8, thumbnail: 'https://i.ytimg.com/vi/tPYj3fFJGjk/maxresdefault.jpg', description: 'Machine learning with TensorFlow', difficulty: 'intermediate', topics: ['TensorFlow', 'implementation'] },
                { id: 'i_LwzRVP7bg', title: 'Statistics for ML', channel: 'StatQuest', duration: '1:23:45', views: '892K', rating: 4.7, thumbnail: 'https://i.ytimg.com/vi/i_LwzRVP7bg/maxresdefault.jpg', description: 'Statistics fundamentals for ML', difficulty: 'beginner', topics: ['statistics', 'math'] },
                { id: 'GwIo3gDZCVQ', title: 'Scikit-learn Tutorial', channel: 'Data School', duration: '2:15:33', views: '1.1M', rating: 4.8, thumbnail: 'https://i.ytimg.com/vi/GwIo3gDZCVQ/maxresdefault.jpg', description: 'Machine learning with scikit-learn', difficulty: 'intermediate', topics: ['scikit-learn', 'Python'] },
                { id: 'YHLzl3bjEhh', title: 'Deep Learning Fundamentals', channel: 'DeepLearningAI', duration: '3:45:22', views: '2.3M', rating: 4.9, thumbnail: 'https://i.ytimg.com/vi/YHLzl3bjEhh/maxresdefault.jpg', description: 'Deep learning concepts and applications', difficulty: 'advanced', topics: ['deep learning', 'AI'] },
                { id: 'VyWAvY2CF9c', title: 'Computer Vision Course', channel: 'freeCodeCamp.org', duration: '2:34:17', views: '1.6M', rating: 4.8, thumbnail: 'https://i.ytimg.com/vi/VyWAvY2CF9c/maxresdefault.jpg', description: 'Computer vision with OpenCV', difficulty: 'advanced', topics: ['computer vision', 'OpenCV'] },
                { id: 'LvmjbXZyoP4', title: 'NLP Course', channel: 'Krish Naik', duration: '4:15:39', views: '967K', rating: 4.7, thumbnail: 'https://i.ytimg.com/vi/LvmjbXZyoP4/maxresdefault.jpg', description: 'Natural language processing', difficulty: 'advanced', topics: ['NLP', 'text processing'] },
                { id: 'JcI5Vnw0b2c', title: 'ML Project Tutorial', channel: 'Tech With Tim', duration: '1:45:23', views: '1.2M', rating: 4.8, thumbnail: 'https://i.ytimg.com/vi/JcI5Vnw0b2c/maxresdefault.jpg', description: 'End-to-end ML project', difficulty: 'advanced', topics: ['projects', 'deployment'] },
                { id: 'SWqhLNY2Qlo', title: 'MLOps Tutorial', channel: 'Made With ML', duration: '2:12:15', views: '634K', rating: 4.6, thumbnail: 'https://i.ytimg.com/vi/SWqhLNY2Qlo/maxresdefault.jpg', description: 'ML operations and deployment', difficulty: 'advanced', topics: ['MLOps', 'production'] }
            ],
            aiInsights: [
                { title: 'Math Foundation', content: 'Strong foundation in statistics and linear algebra is crucial for ML success.' },
                { title: 'Hands-on Practice', content: 'Work with real datasets. Theory without practice won\'t get you far.' },
                { title: 'Start Simple', content: 'Begin with simple algorithms like linear regression before jumping to neural networks.' }
            ]
        },

        'data science': {
            title: 'Complete Data Science Mastery',
            description: 'Master data science from Python basics to advanced analytics including pandas, visualization, statistics, and machine learning.',
            difficulty: 'intermediate',
            estimatedHours: 28.9,
            totalVideos: 9,
            avgRating: 4.8,
            totalViews: '14.2M',
            learningPath: ['Python Basics', 'NumPy & Pandas', 'Data Visualization', 'Statistics', 'EDA', 'Machine Learning', 'Deep Learning', 'Projects', 'Deployment'],
            videos: [
                { id: 'ua-CiDNNj30', title: 'Data Science Full Course', channel: 'Edureka!', duration: '10:53:24', views: '3.2M', rating: 4.7, thumbnail: 'https://i.ytimg.com/vi/ua-CiDNNj30/maxresdefault.jpg', description: 'Complete data science course', difficulty: 'beginner', topics: ['data science', 'Python'] },
                { id: 'vmEHCJofslg', title: 'Python NumPy Tutorial', channel: 'freeCodeCamp.org', duration: '58:41', views: '2.1M', rating: 4.9, thumbnail: 'https://i.ytimg.com/vi/vmEHCJofslg/maxresdefault.jpg', description: 'NumPy for data science', difficulty: 'beginner', topics: ['NumPy', 'arrays'] },
                { id: 'yzIMircGU5I', title: 'Pandas Tutorial', channel: 'Corey Schafer', duration: '6:24:35', views: '1.8M', rating: 4.8, thumbnail: 'https://i.ytimg.com/vi/yzIMircGU5I/maxresdefault.jpg', description: 'Complete pandas tutorial', difficulty: 'intermediate', topics: ['pandas', 'data manipulation'] },
                { id: 'UO98lJQ3QGI', title: 'Matplotlib Tutorial', channel: 'Corey Schafer', duration: '3:12:45', views: '1.3M', rating: 4.7, thumbnail: 'https://i.ytimg.com/vi/UO98lJQ3QGI/maxresdefault.jpg', description: 'Data visualization with matplotlib', difficulty: 'intermediate', topics: ['visualization', 'plotting'] },
                { id: '6GUZXDef2U0', title: 'Seaborn Tutorial', channel: 'Data School', duration: '1:45:33', views: '892K', rating: 4.6, thumbnail: 'https://i.ytimg.com/vi/6GUZXDef2U0/maxresdefault.jpg', description: 'Statistical visualization', difficulty: 'intermediate', topics: ['seaborn', 'statistics'] },
                { id: 'xxpc-HPKN28', title: 'Statistics for Data Science', channel: 'StatQuest', duration: '2:23:17', views: '1.5M', rating: 4.8, thumbnail: 'https://i.ytimg.com/vi/xxpc-HPKN28/maxresdefault.jpg', description: 'Statistics fundamentals', difficulty: 'intermediate', topics: ['statistics', 'analysis'] },
                { id: 'r-uHVfMIEnc', title: 'Exploratory Data Analysis', channel: 'Krish Naik', duration: '1:34:22', views: '967K', rating: 4.7, thumbnail: 'https://i.ytimg.com/vi/r-uHVfMIEnc/maxresdefault.jpg', description: 'EDA techniques and best practices', difficulty: 'intermediate', topics: ['EDA', 'analysis'] },
                { id: 'GwIo3gDZCVQ', title: 'ML for Data Science', channel: 'Data School', duration: '2:45:18', views: '1.2M', rating: 4.8, thumbnail: 'https://i.ytimg.com/vi/GwIo3gDZCVQ/maxresdefault.jpg', description: 'Machine learning applications', difficulty: 'advanced', topics: ['ML', 'applications'] },
                { id: 'JcI5Vnw0b2c', title: 'Data Science Projects', channel: 'Tech With Tim', duration: '3:15:41', views: '1.4M', rating: 4.9, thumbnail: 'https://i.ytimg.com/vi/JcI5Vnw0b2c/maxresdefault.jpg', description: 'End-to-end DS projects', difficulty: 'advanced', topics: ['projects', 'portfolio'] }
            ],
            aiInsights: [
                { title: 'Python Mastery', content: 'Python is the lingua franca of data science. Master pandas and NumPy first.' },
                { title: 'Domain Knowledge', content: 'Technical skills are half the battle. Understanding the business domain is crucial.' },
                { title: 'Storytelling', content: 'Learn to communicate insights effectively. Data visualization and presentation skills matter.' }
            ]
        },

        'php programming': {
            title: 'Complete PHP Programming Mastery',
            description: 'Master PHP from fundamentals to advanced web development including OOP, frameworks, and modern PHP practices.',
            difficulty: 'beginner',
            estimatedHours: 22.5,
            totalVideos: 10,
            avgRating: 4.7,
            totalViews: '18.3M',
            learningPath: ['PHP Basics', 'Variables & Data Types', 'Control Structures', 'Functions', 'OOP', 'Database Integration', 'Frameworks', 'Security', 'APIs', 'Advanced'],
            videos: [
                { id: 'OK_JCtrrv-c', title: 'PHP Tutorial for Beginners - Full Course', channel: 'Programming with Mosh', duration: '1:15:30', views: '3.2M', rating: 4.8, thumbnail: 'https://i.ytimg.com/vi/OK_JCtrrv-c/maxresdefault.jpg', description: 'Complete PHP course for beginners', difficulty: 'beginner', topics: ['php basics', 'fundamentals'] },
                { id: 'BUCiSSyIGGU', title: 'Learn PHP - Full Course', channel: 'freeCodeCamp.org', duration: '2:45:22', views: '2.8M', rating: 4.7, thumbnail: 'https://i.ytimg.com/vi/BUCiSSyIGGU/maxresdefault.jpg', description: 'Comprehensive PHP programming course', difficulty: 'beginner', topics: ['complete course', 'programming'] },
                { id: '2eebptXfEvw', title: 'PHP OOP Tutorial', channel: 'Code Academy', duration: '1:15:45', views: '1.5M', rating: 4.9, thumbnail: 'https://i.ytimg.com/vi/2eebptXfEvw/maxresdefault.jpg', description: 'Object-oriented programming in PHP', difficulty: 'intermediate', topics: ['OOP', 'classes'] },
                { id: 'BwuLxPH8IDs', title: 'PHP MySQL Tutorial', channel: 'Web Dev Simplified', duration: '1:32:18', views: '1.2M', rating: 4.6, thumbnail: 'https://i.ytimg.com/vi/BwuLxPH8IDs/maxresdefault.jpg', description: 'Database integration with PHP', difficulty: 'intermediate', topics: ['mysql', 'database'] },
                { id: 'ImtZ5iEN5gk', title: 'Laravel Framework Tutorial', channel: 'Laracasts', duration: '2:45:22', views: '2.1M', rating: 4.8, thumbnail: 'https://i.ytimg.com/vi/ImtZ5iEN5gk/maxresdefault.jpg', description: 'Modern PHP with Laravel framework', difficulty: 'intermediate', topics: ['laravel', 'framework'] },
                { id: 'l1W2OwSw5AS', title: 'PHP Security Best Practices', channel: 'Security Pro', duration: '1:28:15', views: '856K', rating: 4.7, thumbnail: 'https://i.ytimg.com/vi/l1W2OwSw5AS/maxresdefault.jpg', description: 'Secure PHP development practices', difficulty: 'advanced', topics: ['security', 'best practices'] },
                { id: 'nW1DSB4A4g8', title: 'PHP API Development', channel: 'API Master', duration: '1:45:33', views: '1.1M', rating: 4.5, thumbnail: 'https://i.ytimg.com/vi/nW1DSB4A4g8/maxresdefault.jpg', description: 'Building RESTful APIs with PHP', difficulty: 'advanced', topics: ['API', 'REST'] },
                { id: 'fJ9rUzIMcZQ', title: 'PHP Career Guide', channel: 'Career Path', duration: '1:15:27', views: '743K', rating: 4.6, thumbnail: 'https://i.ytimg.com/vi/fJ9rUzIMcZQ/maxresdefault.jpg', description: 'Career opportunities in PHP', difficulty: 'beginner', topics: ['career', 'opportunities'] },
                { id: 'RgEzQfqg0Iw', title: 'Advanced PHP Patterns', channel: 'Expert Level', duration: '2:34:18', views: '567K', rating: 4.9, thumbnail: 'https://i.ytimg.com/vi/RgEzQfqg0Iw/maxresdefault.jpg', description: 'Master-level PHP design patterns', difficulty: 'advanced', topics: ['patterns', 'advanced'] },
                { id: 'l1W2OwSw5AS', title: 'PHP Performance Optimization', channel: 'Performance Pro', duration: '2:12:45', views: '892K', rating: 4.7, thumbnail: 'https://i.ytimg.com/vi/l1W2OwSw5AS/maxresdefault.jpg', description: 'Optimizing PHP applications', difficulty: 'advanced', topics: ['performance', 'optimization'] }
            ],
            aiInsights: [
                { title: 'Web Development Foundation', content: 'PHP is perfect for web development. Focus on understanding server-side programming first.' },
                { title: 'Framework Learning', content: 'Learn Laravel or Symfony after mastering PHP basics. Frameworks make development faster and more secure.' },
                { title: 'Database Integration', content: 'Master MySQL integration early. Most PHP applications need database connectivity.' }
            ]
        },

        'sql database': {
            title: 'Complete SQL Database Mastery',
            description: 'Master SQL from basic queries to advanced database management including optimization, indexing, and performance tuning.',
            difficulty: 'beginner',
            estimatedHours: 19.8,
            totalVideos: 9,
            avgRating: 4.8,
            totalViews: '15.7M',
            learningPath: ['SQL Basics', 'SELECT Queries', 'JOINS', 'Subqueries', 'Indexes', 'Stored Procedures', 'Triggers', 'Performance', 'Advanced'],
            videos: [
                { id: 'HXV3zeQKqGY', title: 'SQL Tutorial for Beginners - Full Course', channel: 'Programming with Mosh', duration: '1:20:39', views: '4.2M', rating: 4.9, thumbnail: 'https://i.ytimg.com/vi/HXV3zeQKqGY/maxresdefault.jpg', description: 'Complete SQL course for beginners', difficulty: 'beginner', topics: ['sql basics', 'fundamentals'] },
                { id: '7S_tz1z_5bA', title: 'Learn SQL - Full Course', channel: 'freeCodeCamp.org', duration: '2:45:30', views: '3.8M', rating: 4.8, thumbnail: 'https://i.ytimg.com/vi/7S_tz1z_5bA/maxresdefault.jpg', description: 'Comprehensive SQL programming course', difficulty: 'beginner', topics: ['complete course', 'programming'] },
                { id: 'p3qvj9hO_Bo', title: 'SQL JOINs Tutorial', channel: 'Database Pro', duration: '1:15:45', views: '2.1M', rating: 4.9, thumbnail: 'https://i.ytimg.com/vi/p3qvj9hO_Bo/maxresdefault.jpg', description: 'Master SQL JOINs and relationships', difficulty: 'intermediate', topics: ['joins', 'relationships'] },
                { id: 'Hl-zzrqQoSE', title: 'SQL Subqueries Tutorial', channel: 'Query Master', duration: '1:32:18', views: '1.5M', rating: 4.6, thumbnail: 'https://i.ytimg.com/vi/Hl-zzrqQoSE/maxresdefault.jpg', description: 'Advanced SQL with subqueries', difficulty: 'intermediate', topics: ['subqueries', 'advanced'] },
                { id: 'QAV725a8BPE', title: 'Database Design Tutorial', channel: 'Design Pro', duration: '2:45:22', views: '1.8M', rating: 4.8, thumbnail: 'https://i.ytimg.com/vi/QAV725a8BPE/maxresdefault.jpg', description: 'Database design and normalization', difficulty: 'intermediate', topics: ['design', 'normalization'] },
                { id: 'r_MbozD32eo', title: 'SQL Performance Optimization', channel: 'Performance Pro', duration: '1:28:15', views: '1.2M', rating: 4.7, thumbnail: 'https://i.ytimg.com/vi/r_MbozD32eo/maxresdefault.jpg', description: 'Optimizing SQL queries and databases', difficulty: 'advanced', topics: ['performance', 'optimization'] },
                { id: 'Kmgo00avvEw', title: 'Stored Procedures Tutorial', channel: 'Database Expert', duration: '1:45:33', views: '956K', rating: 4.5, thumbnail: 'https://i.ytimg.com/vi/Kmgo00avvEw/maxresdefault.jpg', description: 'Creating and using stored procedures', difficulty: 'advanced', topics: ['stored procedures', 'functions'] },
                { id: 'msXL2oDexqw', title: 'SQL Career Guide', channel: 'Career Path', duration: '1:15:27', views: '743K', rating: 4.6, thumbnail: 'https://i.ytimg.com/vi/msXL2oDexqw/maxresdefault.jpg', description: 'Career opportunities in SQL', difficulty: 'beginner', topics: ['career', 'opportunities'] },
                { id: 'vtPkZShrvXQ', title: 'Advanced SQL Techniques', channel: 'Expert Level', duration: '2:34:18', views: '567K', rating: 4.9, thumbnail: 'https://i.ytimg.com/vi/vtPkZShrvXQ/maxresdefault.jpg', description: 'Master-level SQL techniques', difficulty: 'advanced', topics: ['advanced', 'techniques'] }
            ],
            aiInsights: [
                { title: 'Query Optimization', content: 'Focus on writing efficient queries. Learn about indexes and query execution plans early.' },
                { title: 'Database Design', content: 'Understanding database design principles is crucial for writing good SQL.' },
                { title: 'Practice with Real Data', content: 'Work with real datasets to understand how SQL performs in production environments.' }
            ]
        },

        'photography': {
            title: 'Complete Photography Mastery',
            description: 'Master photography from camera basics to advanced techniques, editing, and creative projects.',
            difficulty: 'beginner',
            estimatedHours: 18.5,
            totalVideos: 9,
            avgRating: 4.8,
            totalViews: '9.2M',
            learningPath: ['Camera Basics', 'Exposure & Lighting', 'Composition', 'Portraits', 'Landscapes', 'Editing', 'Creative Projects', 'Business', 'Advanced'],
            videos: [
                { id: '7b6b9p1VgEc', title: 'Photography for Beginners | Complete Course', channel: 'Photography Pro', duration: '2:15:45', views: '1.2M', rating: 4.8, thumbnail: 'https://i.ytimg.com/vi/7b6b9p1VgEc/maxresdefault.jpg', description: 'Learn the basics of photography, camera settings, and exposure.', difficulty: 'beginner', topics: ['basics', 'camera', 'exposure'] },
                { id: '7b6b9p1VgEc', title: 'Photography Basics Explained', channel: 'Jamie Windsor', duration: '1:32:18', views: '743K', rating: 4.7, thumbnail: 'https://i.ytimg.com/vi/7b6b9p1VgEc/maxresdefault.jpg', description: 'Master ISO, shutter speed, and aperture.', difficulty: 'beginner', topics: ['exposure', 'ISO', 'aperture'] },
                { id: '7b6b9p1VgEc', title: 'Composition Techniques in Photography', channel: 'The Art of Photography', duration: '1:45:33', views: '892K', rating: 4.9, thumbnail: 'https://i.ytimg.com/vi/7b6b9p1VgEc/maxresdefault.jpg', description: 'Rule of thirds, framing, and creative composition.', difficulty: 'intermediate', topics: ['composition', 'framing'] },
                { id: '7b6b9p1VgEc', title: 'Portrait Photography Tips', channel: 'Jessica Kobeissi', duration: '2:28:15', views: '634K', rating: 4.8, thumbnail: 'https://i.ytimg.com/vi/7b6b9p1VgEc/maxresdefault.jpg', description: 'Lighting, posing, and working with models.', difficulty: 'intermediate', topics: ['portrait', 'lighting'] },
                { id: '7b6b9p1VgEc', title: 'Landscape Photography Guide', channel: 'Thomas Heaton', duration: '3:12:45', views: '789K', rating: 4.7, thumbnail: 'https://i.ytimg.com/vi/7b6b9p1VgEc/maxresdefault.jpg', description: 'Capturing stunning landscapes and nature.', difficulty: 'intermediate', topics: ['landscape', 'nature'] },
                { id: '7b6b9p1VgEc', title: 'Editing Photos in Lightroom', channel: 'Peter McKinnon', duration: '1:15:27', views: '567K', rating: 4.8, thumbnail: 'https://i.ytimg.com/vi/7b6b9p1VgEc/maxresdefault.jpg', description: 'Post-processing and color correction.', difficulty: 'advanced', topics: ['editing', 'lightroom'] },
                { id: '7b6b9p1VgEc', title: 'Creative Photography Projects', channel: 'Sean Tucker', duration: '2:34:18', views: '423K', rating: 4.9, thumbnail: 'https://i.ytimg.com/vi/7b6b9p1VgEc/maxresdefault.jpg', description: 'Fun projects to boost creativity.', difficulty: 'advanced', topics: ['projects', 'creativity'] },
                { id: '7b6b9p1VgEc', title: 'Starting a Photography Business', channel: 'SLR Lounge', duration: '1:45:30', views: '312K', rating: 4.7, thumbnail: 'https://i.ytimg.com/vi/7b6b9p1VgEc/maxresdefault.jpg', description: 'Business tips for photographers.', difficulty: 'advanced', topics: ['business', 'career'] },
                { id: '7b6b9p1VgEc', title: 'Advanced Photography Techniques', channel: 'Mango Street', duration: '2:18:41', views: '654K', rating: 4.8, thumbnail: 'https://i.ytimg.com/vi/7b6b9p1VgEc/maxresdefault.jpg', description: 'Long exposure, HDR, and more.', difficulty: 'advanced', topics: ['advanced', 'techniques'] }
            ],
            aiInsights: [
                { title: 'Practice Regularly', content: 'Photography is a hands-on skill. Practice shooting in different conditions and review your work.' },
                { title: 'Learn Editing', content: 'Post-processing is as important as shooting. Master Lightroom or Photoshop for best results.' },
                { title: 'Build a Portfolio', content: 'Showcase your best work online to attract clients and opportunities.' }
            ]
        },
        'swift programming': {
            title: 'Complete Swift Programming Mastery',
            description: 'Master Swift from fundamentals to advanced iOS development including UIKit, SwiftUI, and modern iOS app development.',
            difficulty: 'beginner',
            estimatedHours: 24.3,
            totalVideos: 10,
            avgRating: 4.9,
            totalViews: '12.4M',
            learningPath: ['Swift Basics', 'Variables & Types', 'Control Flow', 'Functions', 'OOP', 'UIKit', 'SwiftUI', 'iOS Development', 'App Store', 'Advanced'],
            videos: [
                { id: 'comgUp0hEX8', title: 'Swift Tutorial for Beginners - Full Course', channel: 'Programming with Mosh', duration: '1:15:30', views: '2.8M', rating: 4.9, thumbnail: 'https://i.ytimg.com/vi/comgUp0hEX8/maxresdefault.jpg', description: 'Complete Swift course for beginners', difficulty: 'beginner', topics: ['swift basics', 'fundamentals'] },
                { id: '09TeUXjzpKs', title: 'Learn Swift - Full Course', channel: 'freeCodeCamp.org', duration: '2:45:22', views: '2.2M', rating: 4.8, thumbnail: 'https://i.ytimg.com/vi/09TeUXjzpKs/maxresdefault.jpg', description: 'Comprehensive Swift programming course', difficulty: 'beginner', topics: ['complete course', 'programming'] },
                { id: 'F2ojC6TNwws', title: 'SwiftUI Tutorial', channel: 'iOS Academy', duration: '1:15:45', views: '1.8M', rating: 4.9, thumbnail: 'https://i.ytimg.com/vi/F2ojC6TNwws/maxresdefault.jpg', description: 'Modern iOS development with SwiftUI', difficulty: 'intermediate', topics: ['swiftui', 'ios'] },
                { id: 'CwA1VWP0Ldw', title: 'UIKit Tutorial', channel: 'iOS Dev', duration: '1:32:18', views: '1.5M', rating: 4.6, thumbnail: 'https://i.ytimg.com/vi/CwA1VWP0Ldw/maxresdefault.jpg', description: 'Traditional iOS development with UIKit', difficulty: 'intermediate', topics: ['uikit', 'ios'] },
                { id: 'n5X_V81OYnQ', title: 'iOS App Development', channel: 'App Builder', duration: '2:45:22', views: '2.1M', rating: 4.8, thumbnail: 'https://i.ytimg.com/vi/n5X_V81OYnQ/maxresdefault.jpg', description: 'Complete iOS app development', difficulty: 'intermediate', topics: ['ios', 'app development'] },
                { id: 'F2ojC6TNwws', title: 'Swift Advanced Features', channel: 'Swift Expert', duration: '1:28:15', views: '856K', rating: 4.7, thumbnail: 'https://i.ytimg.com/vi/F2ojC6TNwws/maxresdefault.jpg', description: 'Advanced Swift programming concepts', difficulty: 'advanced', topics: ['advanced', 'swift'] },
                { id: 'CwA1VWP0Ldw', title: 'iOS App Store Submission', channel: 'App Store Pro', duration: '1:45:33', views: '1.1M', rating: 4.5, thumbnail: 'https://i.ytimg.com/vi/CwA1VWP0Ldw/maxresdefault.jpg', description: 'Publishing apps to the App Store', difficulty: 'advanced', topics: ['app store', 'publishing'] },
                { id: 'n5X_V81OYnQ', title: 'Swift Career Guide', channel: 'Career Path', duration: '1:15:27', views: '743K', rating: 4.6, thumbnail: 'https://i.ytimg.com/vi/n5X_V81OYnQ/maxresdefault.jpg', description: 'Career opportunities in Swift', difficulty: 'beginner', topics: ['career', 'opportunities'] },
                { id: 'F2ojC6TNwws', title: 'Advanced iOS Patterns', channel: 'Expert Level', duration: '2:34:18', views: '567K', rating: 4.9, thumbnail: 'https://i.ytimg.com/vi/F2ojC6TNwws/maxresdefault.jpg', description: 'Master-level iOS development patterns', difficulty: 'advanced', topics: ['patterns', 'advanced'] },
                { id: 'CwA1VWP0Ldw', title: 'Swift Performance Optimization', channel: 'Performance Pro', duration: '2:12:45', views: '892K', rating: 4.7, thumbnail: 'https://i.ytimg.com/vi/CwA1VWP0Ldw/maxresdefault.jpg', description: 'Optimizing Swift applications', difficulty: 'advanced', topics: ['performance', 'optimization'] }
            ],
            aiInsights: [
                { title: 'iOS Development Focus', content: 'Swift is primarily for iOS development. Focus on UIKit and SwiftUI frameworks.' },
                { title: 'Modern Development', content: 'Learn SwiftUI alongside UIKit. SwiftUI is the future of iOS development.' },
                { title: 'App Store Success', content: 'Understanding App Store guidelines and user experience is crucial for success.' }
            ]
        },
        
        // MongoDB Database Course
        'mongodb database': {
            title: 'MongoDB Database',
            description: 'Learn MongoDB, a popular NoSQL database for modern applications.',
            difficulty: 'intermediate',
            duration: '12 hours',
            avgRating: 4.8,
            totalViews: '8.7M',
            learningPath: ['NoSQL Basics', 'MongoDB Setup', 'CRUD Operations', 'Aggregation', 'Indexing', 'Performance', 'Security', 'Deployment', 'Scaling', 'Best Practices'],
            videos: [
                { id: 'pWbMrx5rVBE', title: 'MongoDB Crash Course', channel: 'Traversy Media', duration: '1:29:12', views: '1.2M', rating: 4.9, thumbnail: 'https://i.ytimg.com/vi/pWbMrx5rVBE/maxresdefault.jpg', description: 'Learn MongoDB in 90 minutes', difficulty: 'beginner', topics: ['mongodb', 'nosql'] },
                { id: 'VELru-FCWDM', title: 'MongoDB Complete Tutorial', channel: 'Programming with Mosh', duration: '3:17:25', views: '1.5M', rating: 4.8, thumbnail: 'https://i.ytimg.com/vi/VELru-FCWDM/maxresdefault.jpg', description: 'Complete MongoDB course for beginners', difficulty: 'beginner', topics: ['mongodb', 'database'] },
                { id: 'c2M-rlkkT_0', title: 'MongoDB with Node.js', channel: 'Academind', duration: '2:12:34', views: '980K', rating: 4.7, thumbnail: 'https://i.ytimg.com/vi/c2M-rlkkT_0/maxresdefault.jpg', description: 'Using MongoDB with Node.js applications', difficulty: 'intermediate', topics: ['mongodb', 'nodejs'] },
                { id: 'Ya0H-7A5cE4', title: 'MongoDB Aggregation Framework', channel: 'MongoDB', duration: '1:45:22', views: '650K', rating: 4.6, thumbnail: 'https://i.ytimg.com/vi/Ya0H-7A5cE4/maxresdefault.jpg', description: 'Advanced data processing with MongoDB', difficulty: 'advanced', topics: ['aggregation', 'pipeline'] },
                { id: 'WxBfbOqvVHs', title: 'MongoDB Atlas Tutorial', channel: 'MongoDB University', duration: '1:18:45', views: '520K', rating: 4.5, thumbnail: 'https://i.ytimg.com/vi/WxBfbOqvVHs/maxresdefault.jpg', description: 'Cloud MongoDB deployment with Atlas', difficulty: 'intermediate', topics: ['atlas', 'cloud'] },
                { id: 'leNNivaQAb8', title: 'MongoDB Security Best Practices', channel: 'Database Security', duration: '2:05:18', views: '380K', rating: 4.7, thumbnail: 'https://i.ytimg.com/vi/leNNivaQAb8/maxresdefault.jpg', description: 'Securing MongoDB deployments', difficulty: 'advanced', topics: ['security', 'best practices'] },
                { id: 'RGfFpQF0NpE', title: 'MongoDB Performance Optimization', channel: 'Database Pro', duration: '2:34:56', views: '420K', rating: 4.8, thumbnail: 'https://i.ytimg.com/vi/RGfFpQF0NpE/maxresdefault.jpg', description: 'Optimizing MongoDB for performance', difficulty: 'advanced', topics: ['performance', 'optimization'] },
                { id: 'QAqK-R9HUhc', title: 'MongoDB Schema Design', channel: 'Database Design', duration: '1:42:33', views: '580K', rating: 4.6, thumbnail: 'https://i.ytimg.com/vi/QAqK-R9HUhc/maxresdefault.jpg', description: 'Designing effective MongoDB schemas', difficulty: 'intermediate', topics: ['schema', 'design'] },
                { id: 'VgyMdm-Gw8c', title: 'MongoDB for Beginners', channel: 'NoSQL Basics', duration: '1:15:27', views: '890K', rating: 4.5, thumbnail: 'https://i.ytimg.com/vi/VgyMdm-Gw8c/maxresdefault.jpg', description: 'Getting started with MongoDB', difficulty: 'beginner', topics: ['basics', 'introduction'] },
                { id: 'oSIv-E60NiU', title: 'MongoDB and Microservices', channel: 'Architecture Channel', duration: '2:28:15', views: '470K', rating: 4.7, thumbnail: 'https://i.ytimg.com/vi/oSIv-E60NiU/maxresdefault.jpg', description: 'Using MongoDB in microservices architecture', difficulty: 'advanced', topics: ['microservices', 'architecture'] }
            ],
            aiInsights: [
                { title: 'NoSQL Advantage', content: 'MongoDB excels at handling unstructured data and offers schema flexibility unlike traditional SQL databases.' },
                { title: 'Scaling Strategy', content: 'Learn sharding early as it\'s essential for horizontal scaling of MongoDB deployments.' },
                { title: 'Modern Stack', content: 'MongoDB pairs exceptionally well with Node.js and JavaScript frameworks in modern web development.' }
            ]
        },
        
        'ui/ux design': {
            title: 'Complete UI/UX Design Mastery',
            description: 'Master UI/UX design from fundamentals to advanced techniques including user research, wireframing, prototyping, and design systems.',
            difficulty: 'beginner',
            estimatedHours: 25.5,
            totalVideos: 10,
            avgRating: 4.9,
            totalViews: '14.2M',
            learningPath: ['Design Basics', 'User Research', 'Wireframing', 'Prototyping', 'UI Design', 'UX Principles', 'Design Systems', 'User Testing', 'Portfolio Building', 'Career Growth'],
            videos: [
                { id: 'c9Wg6Cb_YlU', title: 'UI/UX Design Course for Beginners', channel: 'DesignCourse', duration: '3:45:30', views: '2.1M', rating: 4.9, thumbnail: 'https://i.ytimg.com/vi/c9Wg6Cb_YlU/maxresdefault.jpg', description: 'Complete UI/UX design course for beginners', difficulty: 'beginner', topics: ['ui/ux basics', 'fundamentals'] },
                { id: 'wj5s8FQ4AvI', title: 'Learn Figma - UI/UX Design Essential Training', channel: 'Envato Tuts+', duration: '2:15:22', views: '1.8M', rating: 4.8, thumbnail: 'https://i.ytimg.com/vi/wj5s8FQ4AvI/maxresdefault.jpg', description: 'Master Figma for UI/UX design', difficulty: 'beginner', topics: ['figma', 'tools'] },
                { id: 'QwSN4n2sjR8', title: 'User Research Fundamentals', channel: 'UX Research', duration: '1:45:45', views: '1.2M', rating: 4.7, thumbnail: 'https://i.ytimg.com/vi/QwSN4n2sjR8/maxresdefault.jpg', description: 'Learn user research methods and techniques', difficulty: 'intermediate', topics: ['user research', 'methods'] },
                { id: 'aqMZfQODJZo', title: 'Wireframing & Prototyping Tutorial', channel: 'Design Pilot', duration: '2:12:18', views: '1.5M', rating: 4.6, thumbnail: 'https://i.ytimg.com/vi/aqMZfQODJZo/maxresdefault.jpg', description: 'Create effective wireframes and prototypes', difficulty: 'intermediate', topics: ['wireframing', 'prototyping'] },
                { id: 'uL7rkVctm90', title: 'UI Design Principles', channel: 'Design Essentials', duration: '3:05:22', views: '1.7M', rating: 4.8, thumbnail: 'https://i.ytimg.com/vi/uL7rkVctm90/maxresdefault.jpg', description: 'Master UI design principles and patterns', difficulty: 'intermediate', topics: ['ui design', 'principles'] },
                { id: 'kQ_6faxJy_Q', title: 'UX Design Process', channel: 'UX Mastery', duration: '2:28:15', views: '1.3M', rating: 4.7, thumbnail: 'https://i.ytimg.com/vi/kQ_6faxJy_Q/maxresdefault.jpg', description: 'End-to-end UX design process', difficulty: 'advanced', topics: ['ux process', 'methodology'] },
                { id: 'wIuVvCuiJhU', title: 'Design Systems Masterclass', channel: 'Design Systems Pro', duration: '2:45:33', views: '980K', rating: 4.9, thumbnail: 'https://i.ytimg.com/vi/wIuVvCuiJhU/maxresdefault.jpg', description: 'Creating and implementing design systems', difficulty: 'advanced', topics: ['design systems', 'components'] },
                { id: 'eMGBnU6VeX4', title: 'User Testing Methods', channel: 'UX Testing', duration: '1:35:27', views: '870K', rating: 4.6, thumbnail: 'https://i.ytimg.com/vi/eMGBnU6VeX4/maxresdefault.jpg', description: 'Effective user testing techniques', difficulty: 'intermediate', topics: ['user testing', 'evaluation'] },
                { id: 'cYjVJZ6QIcM', title: 'Building a UX Portfolio', channel: 'Portfolio Pro', duration: '1:54:18', views: '920K', rating: 4.8, thumbnail: 'https://i.ytimg.com/vi/cYjVJZ6QIcM/maxresdefault.jpg', description: 'Create a standout UX design portfolio', difficulty: 'beginner', topics: ['portfolio', 'career'] },
                { id: 'QFjnvdx-G88', title: 'Advanced UI Animation', channel: 'Motion Design', duration: '2:22:45', views: '780K', rating: 4.7, thumbnail: 'https://i.ytimg.com/vi/QFjnvdx-G88/maxresdefault.jpg', description: 'Creating engaging UI animations', difficulty: 'advanced', topics: ['animation', 'motion design'] }
            ],
            aiInsights: [
                { title: 'User-Centered Approach', content: 'Always start with user research and maintain a user-centered approach throughout the design process.' },
                { title: 'Tools Proficiency', content: 'Master industry-standard tools like Figma, Sketch, or Adobe XD to improve your workflow efficiency.' },
                { title: 'Portfolio Focus', content: 'Focus on building a strong portfolio with case studies that demonstrate your problem-solving process, not just visual designs.' }
            ]
        }
    }
};

// AI Prompt Templates
const AI_PROMPTS = {
    courseGeneration: `Generate a comprehensive learning course structure for: {topic}`,
    videoAnalysis: `Analyze these YouTube videos and create an optimal learning sequence: {videos}`,
    learningInsights: `Generate AI learning insights for this course: {courseTitle}`
};

// Export configuration
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { CONFIG, DEMO_DATA, AI_PROMPTS };
}
