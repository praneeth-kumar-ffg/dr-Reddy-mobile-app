import React, { memo } from 'react';
import RNPickerSelect from 'react-native-picker-select';

export const Dropdown = () => {
    return (
        <RNPickerSelect
            onValueChange={(value) => console.log(value)}
            items={[
                { label: 'Need Training', value: 'Need Training' },
                { label: 'Problem with Job', value: 'Problem with job' },
                { label: 'Need any material', value: 'Need any Material' },
            ]}
        />
    );
};

export default memo(Dropdown);
