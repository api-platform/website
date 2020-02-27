import React, { useState, useMemo } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import Button from '../../components/common/Button';

const LogoCard = ({ logo }) => {
  const [selectedType, setSelectedType] = useState(logo.types.length && logo.types[0]);
  const [selectedFormat, setSelectedFormat] = useState(selectedType.formats[0]);

  const imageToDownload = useMemo(() => selectedFormat.src, [selectedFormat]);

  const onTypeClickHandler = type => {
    setSelectedType(type);
    setSelectedFormat(type.formats[0]);
  };

  const onFormatClickHandler = format => setSelectedFormat(format);

  return (
    <div className="logo__card card nopadding clickable">
      <div className="logo__checkerboard">
        <img src={logo.thumbnail} alt={logo.name} />
      </div>
      <div className="card__bottom">
        <div
          className={classNames('logo__options', {
            withFormat: 1 < selectedType.formats.length,
          })}
        >
          <div className="logo__types">
            {logo.types.map(type => (
              <button
                onClick={() => onTypeClickHandler(type)}
                className={classNames('logo__type', {
                  active: selectedType && selectedType.type === type.type,
                })}
              >
                {type.type}
              </button>
            ))}
          </div>
          <div className="logo__formats">
            {1 < selectedType.formats.length &&
              selectedType.formats.map(format => (
                <button
                  onClick={() => onFormatClickHandler(format)}
                  className={classNames('logo__format', {
                    active: selectedFormat && selectedFormat.name === format.name,
                  })}
                >
                  {format.name}
                </button>
              ))}
          </div>
        </div>
        <Button icon="download" className="logo__button small" link={imageToDownload} download />
      </div>
    </div>
  );
};

LogoCard.propTypes = {
  logo: PropTypes.shape({
    name: PropTypes.string.isRequired,
    thumbnail: PropTypes.string.isRequired,
    types: PropTypes.arrayOf(
      PropTypes.shape({
        type: PropTypes.string,
        formats: PropTypes.arrayOf(
          PropTypes.shape({
            name: PropTypes.string,
            src: PropTypes.string,
          })
        ),
      })
    ),
  }).isRequired,
};

export default LogoCard;
