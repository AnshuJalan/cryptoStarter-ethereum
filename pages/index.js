import React, { Component } from 'react';
import { Card, Button, Grid } from 'semantic-ui-react';
import factory from '../ethereum/factory';
import Layout from '../components/Layout';
import { Link } from '../routes';

class CampaignIndex extends Component {

    static async getInitialProps() {
        const campaigns = await factory.methods.getCampaigns().call();

        return { campaigns };
    }

    renderCampaigns() {
        const items = this.props.campaigns.map(address => {
            return {
                header: address,
                description: <Link to={"/campaigns/" + address}><a>View Campaign</a></Link>,
                fluid: true
            };
        });

        return <Card.Group items={items} />
    }

    render() {
        return (
            <Layout>
                <h2>Open Campaigns</h2>
                <div>
                    <Grid>
                        <Grid.Column width={12}>
                            {this.renderCampaigns()}
                        </Grid.Column>
                        <Grid.Column width={4}>
                            <Link to="/campaigns/new">
                                <Button content="Create Campaign" icon="plus" labelPosition="left" primary />
                            </Link>
                        </Grid.Column>
                    </Grid>
                </div>
            </Layout>
        );
    }
}


export default CampaignIndex;