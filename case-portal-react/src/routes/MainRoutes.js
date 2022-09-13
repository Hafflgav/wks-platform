import { lazy } from 'react';

// project imports
import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';
import { CaseList } from 'views/caseList/caseList';
import { TaskList } from 'views/taskList/taskList';

import { CaseStatus } from 'common/caseStatus';

import { AppChat } from 'getStream/appChat';

// dashboard routing
const DashboardDefault = Loadable(lazy(() => import('views/dashboard/Default')));

// utilities routing
// const UtilsTypography = Loadable(lazy(() => import('views/utilities/Typography')));
// const UtilsColor = Loadable(lazy(() => import('views/utilities/Color')));
// const UtilsShadow = Loadable(lazy(() => import('views/utilities/Shadow')));
// const UtilsMaterialIcons = Loadable(lazy(() => import('views/utilities/MaterialIcons')));
// const UtilsTablerIcons = Loadable(lazy(() => import('views/utilities/TablerIcons')));

// sample page routing
// const SamplePage = Loadable(lazy(() => import('views/sample-page')));

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
    path: '/',
    element: <MainLayout />,
    children: [
        {
            path: '/',
            element: <DashboardDefault />
        },
        {
            path: 'case-list',
            children: [
                {
                    path: 'cases',
                    element: <CaseList />
                },
                {
                    path: 'wip-cases',
                    element: <CaseList status={CaseStatus.WipCaseStatus.description} />
                },
                {
                    path: 'closed-cases',
                    element: <CaseList status={CaseStatus.ClosedCaseStatus.description} />
                },
                {
                    path: 'archived-cases',
                    element: <CaseList status={CaseStatus.ArchivedCaseStatus.description} />
                }
            ]
        },
        {
            path: 'task-list',
            element: <TaskList />
        },
        {
            path: 'app-chat',
            element: <AppChat />
        },
        {
            path: 'dashboard',
            children: [
                {
                    path: 'default',
                    element: <DashboardDefault />
                }
            ]
        }
        // {
        //     path: 'utils',
        //     children: [
        //         {
        //             path: 'util-typography',
        //             element: <UtilsTypography />
        //         }
        //     ]
        // },
        // {
        //     path: 'utils',
        //     children: [
        //         {
        //             path: 'util-color',
        //             element: <UtilsColor />
        //         }
        //     ]
        // },
        // {
        //     path: 'utils',
        //     children: [
        //         {
        //             path: 'util-shadow',
        //             element: <UtilsShadow />
        //         }
        //     ]
        // },
        // {
        //     path: 'icons',
        //     children: [
        //         {
        //             path: 'tabler-icons',
        //             element: <UtilsTablerIcons />
        //         }
        //     ]
        // },
        // {
        //     path: 'icons',
        //     children: [
        //         {
        //             path: 'material-icons',
        //             element: <UtilsMaterialIcons />
        //         }
        //     ]
        // },
        // {
        //     path: 'sample-page',
        //     element: <SamplePage />
        // }
    ]
};

export default MainRoutes;
