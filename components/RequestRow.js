import React, { Component } from 'react';
import { Table, Button } from 'semantic-ui-react';
import web3 from '../ethereum/web3';
import Campaign from '../ethereum/campaign';
import { Router } from '../routes';

class RequestRow extends Component {
    state = {
        isLoadingApproval: false,
        isLoadingFinalize: false,
        approvalActive: true,
        finalizeActive: true
    }

    onApprove = async () => {
        const campaign = Campaign(this.props.address);

        this.setState({ isLoadingApproval: true });

        try {
            //get accounts
            let accounts = await web3.eth.getAccounts();

            //approve
            await campaign.methods.approveRequest(this.props.id - 1).send({
                from: accounts[0]
            })

            this.setState({ approvalActive: false });

            Router.replaceRoute("/campaigns/" + this.props.address + "/requests");
        } catch (err) {

        }

        this.setState({ isLoadingApproval: false });
    }

    onFinalize = async () => {
        const campaign = Campaign(this.props.address);

        this.setState({ isLoadingFinalize: true });

        try {
            //get accounts
            let accounts = await web3.eth.getAccounts();

            //approve
            await campaign.methods.finalizeRequest(this.props.id - 1).send({
                from: accounts[0]
            })

            this.setState({ finalizeActive: false });

            Router.replaceRoute("/campaigns/" + this.props.address + "/requests");
        } catch (err) {

        }

        this.setState({ isLoadingFinalize: false });
    }

    render() {

        const canApprove = this.props.request.approvalActive > (this.props.noOfApprovers / 2);

        return (
            <Table.Row textAlign="center" disabled={this.props.request.completed} positive={canApprove && !this.props.request.completed}>
                <Table.Cell>{this.props.id}</Table.Cell>
                <Table.Cell>{this.props.request.description}</Table.Cell>
                <Table.Cell>{web3.utils.fromWei(this.props.request.value, "ether")}</Table.Cell>
                <Table.Cell>{this.props.request.recipient}</Table.Cell>
                <Table.Cell>{this.props.request.approvalCount} / {this.props.noOfApprovers}</Table.Cell>
                <Table.Cell>{this.props.request.completed ? null : (<Button color="green" basic active={this.state.approvalActive} loading={this.state.isLoadingApproval} onClick={this.onApprove}>Approve</Button>)}</Table.Cell>
                <Table.Cell>{this.props.request.completed ? null : (<Button color="red" basic active={this.state.finalizeActive} loading={this.state.isLoadingFinalize} onClick={this.onFinalize}>Finalize</Button>)}</Table.Cell>
            </Table.Row>
        );
    }
}

export default RequestRow;