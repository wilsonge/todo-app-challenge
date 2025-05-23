import { Button } from '@aws-amplify/ui-react';
import { signOut } from 'aws-amplify/auth';
import { TabProvider, TabList, Tab, TabPanel, useTabStore } from "@ariakit/react";

import Notes from "./Notes";
import Record from "./Record";

const Screens = () => {
    const tab = useTabStore();
    const defaultSelectedId = "default-selected-tab";

    async function handleSignOut() {
        await signOut()
    }

    return (
        <>
            <div className="flex items-center justify-between">
                <h1 className="text-v1-teal uppercase mb-0 mt-0 text-4xl">Quick Notes</h1>
                <Button className="bg-v1-teal"
                    onClick={handleSignOut}>
                    Sign Out
                </Button>
            </div>
            <TabProvider defaultSelectedId={defaultSelectedId}>
                <TabList className="flex gap-2" store={tab}>
                    <Tab className="tab" id={defaultSelectedId}>Notes</Tab>
                    <Tab className="tab">Record</Tab>
                </TabList>
                <div className="p-2">
                    <TabPanel store={tab} tabId={defaultSelectedId}>
                        <Notes />
                    </TabPanel>
                    <TabPanel store={tab}>
                        <Record />
                    </TabPanel>
                </div>
            </TabProvider>
        </>
    );
};

export default Screens;
