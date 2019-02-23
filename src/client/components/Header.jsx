import React from 'react';
import { PageHeader } from 'react-bootstrap';

export default class Header extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let pageHeader = () => {
      if (this.props.collection) {
        return <PageHeader>
          {this.props.category} <small>{this.props.collection}</small>
        </PageHeader>;
      } else {
        return <PageHeader>
          {this.props.category}
        </PageHeader>;
      }
    }

    return (
      <div className="text-center">
        {pageHeader()}
      </div>
    );
  }
}
