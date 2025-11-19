import type { DefaultTheme } from 'vitepress'

const navZh: DefaultTheme.NavItem[] = [
    {
        text: '首页',
        link: '/zh/'
    },
    {
        text: '算法',
        items: [
            {
                text: '题目',
                items: [
                    {
                        text: 'Blind 75',
                        link: '/zh/docs/Algorithms/Blind75/intro',
                    },
                    {
                        text: '力扣 HOT 100',
                        link: '/zh/docs/Algorithms/Leetcode/intro',
                    },
                ]
            },
            {
                text: '数据结构',
                items: [
                    {
                        text: '基础',
                        link: '/zh/docs/Algorithms/DataStructure/Basics/intro',
                    },
                    {
                        text: '树',
                        link: 'Algorithms/Leetcode/',
                    },
                    {
                        text: '图',
                        link: 'Algorithms/Leetcode/',
                    },
                    {
                        text: '进阶',
                        link: 'Algorithms/Leetcode/',
                    },
                ]
            },
        ],
    },
    {
        text: 'Web开发',
        items: [
            {
                text: '前端',
                items: [
                    {
                        text: 'HTML',
                        link: '/zh/docs/Web Dev/frontend/html/intro',
                    },
                    {
                        text: 'CSS',
                        link: 'Algorithms/Array/ContainsDuplicate',
                    },
                    {
                        text: 'JS',
                        link: 'Algorithms/Array/ContainsDuplicate',
                    },
                    {
                        text: 'React',
                        link: '/zh/docs/Web Dev/frontend/react/01-development-setup',
                    },
                ]
            },
            {
                text: '后端',
                items: [
                    {
                        text: 'Python',
                        link: '/zh/docs/Web Dev/backend/python/django/01-command-line',
                    },
                    {
                        text: 'Java',
                        link: '/zh/docs/Web Dev/backend/java/java_tutorial/quickstart/basics/structure_of_java_program',
                    },
                    {
                        text: 'TypeScript',
                        link: 'Algorithms/Array/ContainsDuplicate',
                    },
                    {
                        text: 'SQL',
                        link: 'Algorithms/Array/ContainsDuplicate',
                    },
                ]
            },
        ],
    },
]

export default navZh