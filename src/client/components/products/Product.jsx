import React from 'react';
import { Button, Tooltip, OverlayTrigger } from 'react-bootstrap';
import { Link } from 'react-router';
import { Image } from 'cloudinary-react';
const cloudName = 'fusedglassbyceleste';

export default class Product extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const edit = (
      <Tooltip id="tooltip"><strong>Edit</strong></Tooltip>
    );

    const displayProduct = () => {
      if (!this.props.edit) {
        return <div className="col-sm-4">
          <div className="thumbnail">
            <div className="row btn-wrap">
              <div className="col-sm-12 text-right">
                <OverlayTrigger placement="top" overlay={edit}>
                  <Link to={`/productupdate/${this.props.productId}`}>
                    <Button bsStyle="success">
                      <span className="glyphicon glyphicon-pencil" aria-hidden="true"></span>
                    </Button>
                  </Link>
                </OverlayTrigger>
              </div>
            </div>

            <Image cloudName={cloudName} publicId={this.props.productImagePublicId} width="300" height="200" crop="pad" />

            <div className="caption">
              <h4>{this.props.productName}</h4>
              <p>{this.props.productDescription}</p>
              <p>{this.props.productPrice}</p>
              <Link to={`/productdetails/${this.props.productId}`}>
                <Button bsStyle="primary">Buy Now</Button>
              </Link>
            </div>
          </div>
        </div>;
      } else {
        return <div className="col-sm-4">
          <div className="thumbnail">

            <Image className="img-padd" cloudName={cloudName} publicId={this.props.productImagePublicId} width="300" height="200" crop="pad" />

            <div className="caption">
              <h4>{this.props.productName}</h4>
              <p>{this.props.productDescription}</p>
              <p>{this.props.productPrice}</p>
              <Link to={`/productdetails/${this.props.productId}`}>
                <Button bsStyle="primary">Buy Now</Button>
              </Link>
            </div>
          </div>
        </div>;
      }
    }

    return (
      <div>
        {displayProduct()}
      </div>
    );
  }
}
