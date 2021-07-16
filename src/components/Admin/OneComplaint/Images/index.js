import React, { useState, useCallback } from 'react';
import packageJson from '../../../../../package.json';
import ImageViewer from 'react-simple-image-viewer';

const Images = props => {

    const [currentImage, setCurrentImage] = useState(0);
    const [isViewerOpen, setIsViewerOpen] = useState(false);

    const openImageViewer = useCallback(index => {
        setCurrentImage(index);
        setIsViewerOpen(true);
    }, []);

    const closeImageViewer = () => {
        setCurrentImage(0);
        setIsViewerOpen(false);
    };

    const images = props.images ? props.images.map(img => packageJson.backendUrl + '/media/images/' + img.name) : [];

    return(
        <div>
            {images.map((image, key) =>
                <img
                    src={image}
                    key={key}
                    alt={'image-' + key}
                    onClick={() => openImageViewer(key)}
                    style={{
                        height: 'auto',
                        maxWidth: '300px',
                        margin: '5px',
                        display: 'inline-block'
                    }}
                />
            )}
            {isViewerOpen && (
                <ImageViewer
                    src={ images }
                    currentIndex={ currentImage }
                    onClose={ closeImageViewer }
                />
            )}
        </div>
    )
}

export default Images;