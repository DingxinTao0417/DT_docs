import type { DefaultTheme } from 'vitepress'

const navZh: DefaultTheme.NavItem[] = [
    {
        text: '算法',
        items: [
            {
                text: '题目',
                items: [
                    {
                        text: 'Blind 75',
                        link: 'zh/docs/Algorithms/Blind75/intro',
                    },
                    {
                        text: '力扣',
                        link: 'zh/docs/Algorithms/Leetcode/intro',
                    },
                ]
            },
            {
                text: '数据结构',
                items: [
                    {
                        text: '基础',
                        link: 'Algorithms/DataStructure/Basics/intro',
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
                        link: 'Web Dev/frontend/html/intro',
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
                        link: 'Web Dev/frontend/react/01-development-setup',
                    },
                ]
            },
            {
                text: '后端',
                items: [
                    {
                        text: 'Python',
                        link: 'Web Dev/backend/python/django/01-command-line',
                    },
                    {
                        text: 'Java',
                        link: 'Web Dev/backend/java/java_tutorial/quickstart/basics/structure_of_java_program',
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
            {
                text: '运维',
                items: [
                    {
                        text: 'Linux/Shell',
                        link: 'Algorithms/Array/TwoSum',
                    },
                    {
                        text: 'Git',
                        link: 'Algorithms/Array/ContainsDuplicate',
                    },
                    {
                        text: 'AWS',
                        link: 'Algorithms/Array/ContainsDuplicate',
                    },
                    {
                        text: 'Docker',
                        link: 'Algorithms/Array/ContainsDuplicate',
                    },
                ]
            },
            {
                text: 'UI/UX',
                items: [
                    {
                        text: 'Figma',
                        link: 'Algorithms/Array/TwoSum',
                    },
                ]
            },

        ],
    },
    {
        text: '数据科学',
        items: [
            {
                text: '机器学习',
                items: [
                    {
                        text: '监督学习',
                        link: 'Algorithms/Array/TwoSum',
                    },
                    {
                        text: '非监督学习',
                        link: 'Algorithms/Array/ContainsDuplicate',
                    },
                    {
                        text: '强化学习',
                        link: 'Algorithms/Array/ContainsDuplicate',
                    },
                ]
            },
            {
                text: '数据分析',
                items: [
                    {
                        text: 'SQL',
                        link: 'Algorithms/Array/TwoSum',
                    },
                    {
                        text: 'Statistics',
                        link: 'Algorithms/Array/ContainsDuplicate',
                    },
                    {
                        text: 'Python',
                        link: 'Algorithms/Array/ContainsDuplicate',
                    },
                    {
                        text: 'R language',
                        link: 'Algorithms/Array/ContainsDuplicate',
                    },
                    {
                        text: 'Visualization',
                        link: 'Algorithms/Array/ContainsDuplicate',
                    },

                ]
            },
        ],
    },
]

export default navZh