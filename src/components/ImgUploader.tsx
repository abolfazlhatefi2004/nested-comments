import React from 'react';
import { Button, Box, Avatar } from '@mui/material';

interface PropsType {
    imgUrl: string,
    getImageUrl:  (e: React.ChangeEvent<HTMLInputElement>) => void
}

export default function ImgUploader({imgUrl, getImageUrl}: PropsType) {


    return (
        <Box sx={{ textAlign: 'center', p: 2 }}>
            <Button variant="outlined" component="label">
                Upload Image
                <input
                    hidden
                    accept="image/*"
                    type="file"
                    name='imgUrl'
                    onChange={getImageUrl}
                />
            </Button>

            {imgUrl && (
                <Box mt={2}>
                    <Avatar
                        alt="profile avatar"
                        src={imgUrl}
                        sx={{ width: 100, height: 100, margin: '0 auto' }}
                    />
                </Box>
            )}
        </Box>
    );
};

