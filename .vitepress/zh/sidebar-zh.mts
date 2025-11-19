import type { DefaultTheme } from 'vitepress'

const sidebarZh: DefaultTheme.Sidebar = {
    '/zh/docs/Algorithms/Blind75/': [{
        text: 'Blind 75',
        items: [
            {
                text: 'Introduction',
                link: '/zh/docs/Algorithms/Blind75/intro'
            },
            {
                text: 'Array', items: [
                    { text: 'What is Array', link: '/zh/docs/Algorithms/Blind75/Array/array' },
                    { text: 'Two Sum', link: '/zh/docs/Algorithms/Blind75/Array/two_sum' },
                    { text: 'Best Time to Buy and Sell Stock', link: '/zh/docs/Algorithms/Blind75/Array/best_time_to_buy_and_sell_stock' },
                ]
            },
            {
                text: 'Binary', items: [
                    { text: 'Number of 1 Bits', link: '/zh/docs/Algorithms/Blind75/Binary/Number of 1 Bits' },
                    { text: 'Sum of Two Integers', link: '/zh/docs/Algorithms/Blind75/Binary/Sum of Two Integers' },
                ]
            }
        ]
    }],
    '/zh/docs/Algorithms/Leetcode/': [{
        text: 'Leetcode',
        items: [
            {
                text: 'Introduction',
                link: '/zh/docs/Algorithms/Leetcode/intro'
            },
        ]
    }],

    '/zh/docs/Algorithms/DataStructure/Basics/': [{
        text: 'Basics',
        items: [
            {
                text: 'Introduction',
                link: '/zh/docs/Algorithms/DataStructure/Basics/intro'
            },
            {
                text: 'Asymptotic Notation', items: [
                    { text: 'Big O Notation', link: '/zh/docs/Algorithms/DataStructure/Basics/asymptotic_notation/big_O' },
                    { text: 'Big Theta Notation', link: '/zh/docs/Algorithms/DataStructure/Basics/asymptotic_notation/big_theta' },
                    { text: 'Big Omega Notation', link: '/zh/docs/Algorithms/DataStructure/Basics/asymptotic_notation/big_omega' },
                ]
            },
            {
                text: 'Complexity', items: [
                    { text: 'Time Complexity', link: '/zh/docs/Algorithms/DataStructure/Basics/complexity/time_complexity' },
                    { text: 'Space Complexity', link: '/zh/docs/Algorithms/DataStructure/Basics/complexity/space_complexity' },
                ]
            },
            {
                text: 'Data Structures', items: [
                    { text: 'Array', link: '/zh/docs/Algorithms/DataStructure/Basics/array' },
                    { text: 'Linked List', link: '/zh/docs/Algorithms/DataStructure/Basics/linkedlist' },
                    { text: 'Queues', link: '/zh/docs/Algorithms/DataStructure/Basics/queues' },
                    { text: 'Stacks', link: '/zh/docs/Algorithms/DataStructure/Basics/stacks' },
                    { text: 'Hash Tables', link: '/zh/docs/Algorithms/DataStructure/Basics/hashtables' },
                ]
            },
        ]
    }],
    '/zh/docs/Web Dev/frontend/html/': [
        {
            text: 'HTML',
            items: [
                {
                    text: 'Introduction',
                    link: '/zh/docs/Web Dev/frontend/html/intro'
                },
            ]
        },
    ],

    '/zh/docs/Web Dev/frontend/react/' : [
        {
            text: 'React',
            items: [
                {
                    text: 'Basics',
                    items: [
                        { text: 'Development Setup', link: '/zh/docs/Web Dev/frontend/react/01-development-setup' },
                        { text: 'JSX basics', link: '/zh/docs/Web Dev/frontend/react/02-jsx-basics' },
                        { text: 'Events', link: '/zh/docs/Web Dev/frontend/react/03-events' },
                        { text: 'Components', link: '/zh/docs/Web Dev/frontend/react/04-components' },
                        { text: 'Youtube Comments Case', link: '/zh/docs/Web Dev/frontend/react/05-youtube-comments-case' },
                        { text: 'Forms', link: '/zh/docs/Web Dev/frontend/react/06-forms' },
                        { text: 'Component Communication', link: '/zh/docs/Web Dev/frontend/react/07-component-communication' },
                        { text: 'useEffect', link: '/zh/docs/Web Dev/frontend/react/08-useEffect' },
                        { text: 'Custom Hooks', link: '/zh/docs/Web Dev/frontend/react/09-custom-hooks' },
                        { text: 'Optimize Comments Case', link: '/zh/docs/Web Dev/frontend/react/10-optimize-comments-case' },
                        { text: 'Redux Intro', link: '/zh/docs/Web Dev/frontend/react/11-redux-intro' },
                        { text: 'Ubereat Mini Case', link: '/zh/docs/Web Dev/frontend/react/12-ubereat-mini-case' },
                        { text: 'Routing', link: '/zh/docs/Web Dev/frontend/react/13-routing' },
                        { text: 'Expense Tracker Case', link: '/zh/docs/Web Dev/frontend/react/14-expense-tracker-case' },
                        { text: 'Article Management Case', link: '/zh/docs/Web Dev/frontend/react/15-article-management-system-case' },
                        { text: 'useRender', link: '/zh/docs/Web Dev/frontend/react/16-useReducer' },
                        { text: 'Performance Optimization', link: '/zh/docs/Web Dev/frontend/react/17-performance-optimization' },
                        { text: 'ForwardRef', link: '/zh/docs/Web Dev/frontend/react/18-forwardRef' },
                        { text: 'useImperativeHandle', link: '/zh/docs/Web Dev/frontend/react/19-useImperativeHandle' },
                        { text: 'class API', link: '/zh/docs/Web Dev/frontend/react/20-class-api' },
                        { text: 'Zustand', link: '/zh/docs/Web Dev/frontend/react/21-zustand' },
                    ]
                    
                },
            ]
        },
    ],

    '/zh/docs/Web Dev/backend/java/': [
        {
            text: 'Java',
            items: [
                {
                    text: 'Quick Start', collapsed: true, items: [
                        {
                            text: 'Basics', collapsed: true, items: [
                                { text: 'Structure of a Java program', link: '/zh/docs/Web Dev/backend/java/java_tutorial/quickstart/basics/structure_of_java_program' },
                                { text: 'Variable & Data type', link: '/zh/docs/Web Dev/backend/java/java_tutorial/quickstart/basics/variable and data type' },
                                { text: 'Integer', link: '/zh/docs/Web Dev/backend/java/java_tutorial/quickstart/basics/integer arithmetic' },
                                { text: 'Float', link: '/zh/docs/Web Dev/backend/java/java_tutorial/quickstart/basics/float arithmetic' },
                                { text: 'Boolean', link: '/zh/docs/Web Dev/backend/java/java_tutorial/quickstart/basics/boolean operation' },
                                { text: 'Char & String', link: '/zh/docs/Web Dev/backend/java/java_tutorial/quickstart/basics/char and string' },
                                { text: 'Array', link: '/zh/docs/Web Dev/backend/java/java_tutorial/quickstart/basics/array' },
                            ]
                        },
                        {
                            text: 'Flow Control', collapsed: true, items: [
                                { text: 'Input & Output', link: '/zh/docs/Web Dev/backend/java/java_tutorial/quickstart/flowcontrol/inputoutput' },
                                { text: 'If statement', link: '/zh/docs/Web Dev/backend/java/java_tutorial/quickstart/flowcontrol/if statement' },
                                { text: 'Switch statement', link: '/zh/docs/Web Dev/backend/java/java_tutorial/quickstart/flowcontrol/switch statement' },
                                { text: 'While loop', link: '/zh/docs/Web Dev/backend/java/java_tutorial/quickstart/flowcontrol/while loop' },
                                { text: 'Do while', link: '/zh/docs/Web Dev/backend/java/java_tutorial/quickstart/flowcontrol/do while' },
                                { text: 'For loop', link: '/zh/docs/Web Dev/backend/java/java_tutorial/quickstart/flowcontrol/for loop' },
                                { text: 'Break & Continue', link: '/zh/docs/Web Dev/backend/java/java_tutorial/quickstart/flowcontrol/break continue' },
                            ]
                        },
                        {
                            text: 'Array Operations', collapsed: true, items: [
                                { text: 'Traverse array', link: '/zh/docs/Web Dev/backend/java/java_tutorial/quickstart/arrayoperations/traversing array' },
                                { text: 'Sort array', link: '/zh/docs/Web Dev/backend/java/java_tutorial/quickstart/arrayoperations/sorting array' },
                                { text: 'Multidimensional array', link: '/zh/docs/Web Dev/backend/java/java_tutorial/quickstart/arrayoperations/multidimensional array' },
                            ]
                        },                        

                    ]
                },
            ]
        },
        {
            text: 'SpringBoot',
            items: [
                {
                    text: 'Structure of a java program',
                    link: '/Web Dev/backend/java/java_tutorial/structure_of_java_program'
                },
            ]
        },
    ],
    '/zh/docs/Web Dev/backend/python/django/': [
        {
            text: 'Python',
            items: [
                {
                    text: 'Django', collapsed: true, items: [
                        { text: 'Command Line', link: '/zh/docs/Web Dev/backend/python/django/01-command-line' },
                        { text: 'Project Files', link: '/zh/docs/Web Dev/backend/python/django/02-project-files' },
                        { text: 'Apps', link: '/zh/docs/Web Dev/backend/python/django/03-apps' },
                        { text: 'CLI vs PyCharm', link: '/zh/docs/Web Dev/backend/python/django/04-cli-vs-pycharm' },
                        { text: 'Core Responses', link: '/zh/docs/Web Dev/backend/python/django/05-core-responses' },
                        { text: 'Static Files', link: '/zh/docs/Web Dev/backend/python/django/06-static-files' },
                        { text: 'Request Object', link: '/zh/docs/Web Dev/backend/python/django/07-request-object' },
                        { text: 'Database (MySQL)', link: '/zh/docs/Web Dev/backend/python/django/08-database-mysql' },
                        { text: 'ORM Basics', link: '/zh/docs/Web Dev/backend/python/django/09-orm-basics' },
                        { text: 'Request Lifecycle', link: '/zh/docs/Web Dev/backend/python/django/10-request-lifecycle' },
                        { text: 'Routing', link: '/zh/docs/Web Dev/backend/python/django/11-routing' },
                        { text: 'Version Differences', link: '/zh/docs/Web Dev/backend/python/django/12-version-differences' },
                        { text: 'Views', link: '/zh/docs/Web Dev/backend/python/django/13-views' },
                        { text: 'Templates', link: '/zh/docs/Web Dev/backend/python/django/14-templates' },
                        { text: 'Models', link: '/zh/docs/Web Dev/backend/python/django/15-models' },
                        { text: 'AJAX', link: '/zh/docs/Web Dev/backend/python/django/16-ajax' },
                        { text: 'Forms', link: '/zh/docs/Web Dev/backend/python/django/17-forms' },
                        { text: 'Forms Component', link: '/zh/docs/Web Dev/backend/python/django/18-forms-component' },
                        { text: 'Cookie & Session', link: '/zh/docs/Web Dev/backend/python/django/19-cookie-session' },
                        { text: 'Middleware & CSRF', link: '/zh/docs/Web Dev/backend/python/django/20-middleware-csrf' },
                        { text: 'Auth', link: '/zh/docs/Web Dev/backend/python/django/21-auth' },
                        { text: 'Table Design (BBS)', link: '/zh/docs/Web Dev/backend/python/django/22-table-design-bbs' },
                        { text: 'Admin', link: '/zh/docs/Web Dev/backend/python/django/23-admin' },
                        { text: 'Permissions & Groups', link: '/zh/docs/Web Dev/backend/python/django/24-permissions-groups' },
                        { text: 'DRF Basics', link: '/zh/docs/Web Dev/backend/python/django/25-drf-basics' },
                    ]
                }
            ]
        }
    ],
}

export default sidebarZh