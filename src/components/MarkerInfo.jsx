import React from 'react';
import { ImLocation2 } from 'react-icons/im';
import { OverlayTrigger, Popover } from 'react-bootstrap';

const MarkerInfo = ({ address }) => {
  return (
    <div>
      <OverlayTrigger
        defaultShow={true}
        placement="top"
        overlay={
          <Popover id={`popover-positioned-tot`}>
            <Popover.Header as="h3">{`Holy guacamole!`}</Popover.Header>
            <Popover.Body>
              <strong>Here is your Location </strong> {address}.
            </Popover.Body>
          </Popover>
        }
      >
        <div>
          <ImLocation2 size={30} className="text-danger" />
        </div>
      </OverlayTrigger>
    </div>
  );
};

export default MarkerInfo;
