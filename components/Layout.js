import React from 'react';
import { Menu, Container } from 'semantic-ui-react';
import { Link } from '../routes';

export default (props) => {
    return (
        <Container>
            <link rel="stylesheet" href="//cdn.jsdelivr.net/npm/semantic-ui@2.4.2/dist/semantic.min.css" />
            <Menu>
                <Link to="/">
                    <Menu.Item header>Crypto Starter</Menu.Item>
                </Link>
                <Menu.Menu position="right">
                    <Link to='/'>
                        <Menu.Item>
                            Campaigns
                        </Menu.Item>
                    </Link>
                    <Link to='/campaigns/new'>
                        <Menu.Item>
                            +
                        </Menu.Item>
                    </Link>
                </Menu.Menu>
            </Menu>
            {props.children}
        </Container>
    );
}