import React, {useEffect, useState} from 'react';
import BaseDrawer from '../BaseDrawer';
import MainMenu from './MainMenu/MainMenu';
const RightDrawer = (props) => {
    const [show, setShow] = useState(false);
    const [sectionName, setSectionName] = useState('Menu');
    useEffect(() => {
        props.show && setShow(true);
    }, [props.show]);

    const handleBackClick = () => {
        if (sectionName === 'About this board' || sectionName === 'Change background') setSectionName('Menu');
        else setSectionName('Change background');
    };

    return (
        <BaseDrawer
            title={sectionName}
            show={show}
            closeCallback={(param) => {
                setShow(param);
                props.closeCallback();
            }}
            backClickCallback={handleBackClick}
            showBackIcon={sectionName !== "Menu"}
            content={
                sectionName === 'Menu' ? (
                        <MainMenu
                            menuCallback={(param) => {
                                setSectionName(param);
                            }}
                        />
                    ) :
                    sectionName === 'About this board' ? (
                        "AboutMenu here"
                        // AboutMenu Component
                    ) : (
                       "Background menu here"
                        // BackgroundMenu Component
                    )
            }
        />
    );
};

export default RightDrawer;
