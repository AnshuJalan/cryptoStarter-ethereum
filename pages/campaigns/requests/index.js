import React, { Component } from 'react';
import Layout from '../../../components/Layout';
import { Button, Table } from 'semantic-ui-react';
import Campaign from '../../../ethereum/campaign';
import { Link } from '../../../routes';
import RequestRow from '../../../components/RequestRow';


class RequestIndex extends Component {
    state = {}

    static async getInitialProps(props) {
        const { address } = props.query;
        const campaign = Campaign(address);
        const requestsCount = await campaign.methods.getRequestsCount().call();

        const approverCount = await campaign.methods.noOfApprovers().call();

        console.log(requestsCount);

        const requests = await Promise.all(
            Array(parseInt(requestsCount)).fill().map((Element, index) => {
                return campaign.methods.requests(index).call();
            })
        );

        console.log(requests);

        return { address, requests, approverCount, requestsCount };
    }

    renderRows = () => {
        return (
            this.props.requests.map((request, index) =>
                <RequestRow
                    key={index}
                    id={index + 1}
                    request={this.props.requests[index]}
                    address={this.props.address}
                    noOfApprovers={this.props.approverCount}
                />
            )
        );
    }

    render() {
        return (
            <Layout>
                <h3>Requests</h3>
                <Link to={"/campaigns/" + this.props.address + '/requests/new'}>
                    <Button primary floated="right" style={{ marginBottom: 10 }}>Add request</Button>
                </Link>
                <Table celled>
                    <Table.Header>
                        <Table.Row textAlign="center">
                            <Table.HeaderCell>Id</Table.HeaderCell>
                            <Table.HeaderCell>Description</Table.HeaderCell>
                            <Table.HeaderCell>Amount</Table.HeaderCell>
                            <Table.HeaderCell>Recipient</Table.HeaderCell>
                            <Table.HeaderCell>Approval Count</Table.HeaderCell>
                            <Table.HeaderCell>Approve</Table.HeaderCell>
                            <Table.HeaderCell>Finalize</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>

                    <Table.Body>
                        {this.renderRows()}
                    </Table.Body>
                </Table>
                <p>Found {this.props.requestsCount} requests</p>
            </Layout>
        );
    }
}

export default RequestIndex;