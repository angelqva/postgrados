import React, { Fragment } from 'react';
import { Outlet } from 'react-router-dom';
import Appbar from './Appbar';

export default function Layout() { 
    return (
        <Fragment>
            <Appbar />
            <main>
                <Outlet/>
            </main>
        </Fragment>
    );
}
