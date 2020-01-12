import React, { Component } from 'react';
import Layout from '../../../components/Layout'
import { Input, Form, Grid, Button, Message } from 'semantic-ui-react';
import web3 from '../../../ethereum/web3';
import Campaign from '../../../ethereum/campaign';
import { Router, Link } from '../../../routes';


class RequestNew extends Component {
    state = {
        description: '',
        value: '',
        recipient: '',
        errorMessage: '',
        isLoading: false
    }

    static async getInitialProps(props) {
        const { address } = props.query;

        return { address };
    }

    onSubmit = async (event) => {
        event.preventDefault();

        console.log(this.props.address);
        //Get the campaign contract
        const campaign = Campaign(this.props.address);

        this.setState({ isLoading: true });

        try {
            //Get address
            let accounts = await web3.eth.getAccounts();

            //Send request
            await campaign.methods.createRequest(this.state.description, web3.utils.toWei(this.state.value, "ether"), this.state.recipient).send(
                { from: accounts[0] }
            );

            Router.pushRoute('/campaigns/' + this.props.address);

        } catch (error) {
            this.setState({ errorMessage: error.message });
        }

        this.setState({ isLoading: false });

    }

    clearError = () => {
        this.setState({ errorMessage: '' });
    }

    render() {
        return (
            <Layout>
                <Link to={"/campaigns/" + this.props.address + "/requests"}>
                    <a>Back</a>
                </Link>
                <h3>Create a Request</h3>
                <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
                    <Grid>
                        <Grid.Column width={6}>
                            <Form.Field>
                                <label>Description</label>
                                <Input value={this.state.description} onChange={event => { this.setState({ description: event.target.value }) }} />
                            </Form.Field>
                            <Form.Field>
                                <label>Value</label>
                                <Input
                                    label="Ether"
                                    labelPosition="right"
                                    value={this.state.value}
                                    onChange={event => { this.setState({ value: event.target.value }) }} />
                            </Form.Field>
                            <Form.Field>
                                <label>Recipient</label>
                                <Input value={this.state.recipient} onChange={event => { this.setState({ recipient: event.target.value }) }} />
                            </Form.Field>
                            <Button loading={this.state.isLoading} primary>Create</Button>
                        </Grid.Column>
                    </Grid>
                    <Message error header="Oops" content={this.state.errorMessage} onDismiss={this.clearError} />
                </Form>
            </Layout>
        );
    }
}

export default RequestNew;