import React, { Component } from 'react';
import Layout from '../../components/Layout';
import { Grid, Card, Input, Form, Message, Button } from 'semantic-ui-react';
import Campaign from '../../ethereum/campaign';
import web3 from '../../ethereum/web3';
import { Router, Link } from '../../routes';

class CampaignShow extends Component {
    state = {
        errorMessage: '',
        contribution: '',
        isLoading: false
    }

    static async getInitialProps(props) {

        const campaign = Campaign(props.query.address);
        const summary = await campaign.methods.getSummary().call();

        return { summary, campaign };
    }

    onSubmit = async (event) => {
        event.preventDefault();

        this.setState({ isLoading: true });

        try {
            //Get accounts
            let accounts = await web3.eth.getAccounts();

            //Contribute
            await this.props.campaign.methods.contribute().send({
                value: web3.utils.toWei(this.state.contribution, "ether"),
                from: accounts[0]
            });

        } catch (error) {
            this.setState({ errorMessage: error.message });
        }

        this.setState({ isLoading: false });
        Router.replaceRoute('/campaigns/' + this.props.campaign.options.address);
    }

    renderCards() {
        const items = [
            {
                header: this.props.summary[4],
                meta: 'Manager',
                description: 'The creator and controller of the campaign.',
                style: { overflowWrap: 'break-word' }
            },
            {
                header: web3.utils.fromWei(this.props.summary[1], "ether"),
                meta: "Campaign Balance (ether)",
                description: "Total current balance available.",
            },
            {
                header: this.props.summary[0],
                meta: "Minimum Contribution (wei)",
                description: "Minimum contribution if you want to be an approver.",
            },
            {
                header: this.props.summary[2],
                meta: "Requests",
                description: "Total number of requests generated."
            },
            {
                header: this.props.summary[3],
                meta: "Contributors",
                description: "Total number of approvers for the campaign."
            }
        ];

        return <Card.Group items={items} />
    }

    clearError = () => {
        this.setState({ errorMessage: '' });
    }

    render() {
        return (
            <Layout>
                <h3>Campaign Details</h3>
                <Grid>
                    <Grid.Column width={10}>
                        {this.renderCards()}
                    </Grid.Column>
                    <Grid.Column width={6}>
                        <h3>Contribute to the campaign!</h3>
                        <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
                            <Form.Field>
                                <label>Contribution</label>
                                <Input
                                    label="Ether"
                                    labelPosition="right"
                                    value={this.state.contribution}
                                    onChange={event => { this.setState({ contribution: event.target.value }) }}
                                />
                            </Form.Field>
                            <Button loading={this.state.isLoading} primary>Contribute</Button>
                            <Message error header="Oops!" content={this.state.errorMessage} onDismiss={this.clearError} />
                        </Form>
                    </Grid.Column>
                </Grid>
                <br />
                <Link to={'/campaigns/' + this.props.campaign.options.address + '/requests'}>
                    <Button primary>View Requests</Button>
                </Link>
            </Layout>
        );
    }
}

export default CampaignShow;