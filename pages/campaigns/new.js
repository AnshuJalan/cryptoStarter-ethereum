import React, { Component } from 'react';
import Layout from '../../components/Layout';
import { Form, Button, Input, Message } from 'semantic-ui-react';
import web3 from '../../ethereum/web3';
import factory from '../../ethereum/factory';
import { Router } from '../../routes';

class CampaignNew extends Component {
    state = {
        minimumContrib: '',
        errorMessage: '',
        isLoading: false
    }

    onSubmit = async (event) => {
        event.preventDefault();

        try {

            this.setState({ isLoading: true, errorMessage: '' });

            //Get accounts
            let accounts = await web3.eth.getAccounts();

            //Create campaign
            await factory.methods.createCampaign(this.state.minimumContrib)
                .send({ from: accounts[0] });
            
            Router.pushRoute('/');

        } catch (error) {
            const errorMessage = error.message;
            this.setState({ errorMessage });
        }

        this.setState({ isLoading: false });
    }

    clearError = () => {
        this.setState({ errorMessage: '' });
    }

    render() {
        return (
            <Layout>
                <h3>Create a Camapign</h3>
                <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
                    <Form.Field>
                        <label>Minimum contribution</label>
                        <Input
                            label="Wei"
                            labelPosition="right"
                            value={this.state.minimumContrib}
                            onChange={event => { this.setState({ minimumContrib: event.target.value }) }}
                        />
                    </Form.Field>
                    <Button loading={this.state.isLoading} primary>Create Campaign</Button>
                    <Message error header="Oops!" content={this.state.errorMessage} onDismiss={this.clearError} />
                </Form>
            </Layout>);
    }
}

export default CampaignNew;