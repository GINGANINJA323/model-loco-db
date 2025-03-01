import * as React from 'react';
import styled from 'styled-components';

interface TrainImageProps {
    id: string;
}

const TrainImage = (props: TrainImageProps) => {
    const { id } = props;
    const [image, setImage] = React.useState<string>();

    const getImage = async() => {
        const response = await fetch(`/api/train-image/${id}`);

        if (!response.ok) {
            console.log('Failed to get image:', response.status);
            return;
        }

        // https://stackoverflow.com/questions/44611047/get-image-from-server-and-preview-it-on-client
        // Convert the arrayBuffer response to b64 for use in an img tag
        const data = await response.arrayBuffer();
        const b64 = btoa(new Uint8Array(data).reduce((d, b) => String(d + String.fromCharCode(b)), ''))

        setImage(`data:;base64,${b64}`);
    }

    React.useEffect(() => {
        getImage();
    });

    return (
        <img width={'100%'} src={image} />
    );
}

export default TrainImage;