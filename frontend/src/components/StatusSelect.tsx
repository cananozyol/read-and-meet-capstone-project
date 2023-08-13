import {ChangeEvent} from 'react';
import {FormControl, FormControlLabel, Radio, RadioGroup} from '@mui/material';
import {Status} from '../models/books';

type Props = {
    selectedStatus: Status;
    onStatusChange: (event: ChangeEvent<HTMLInputElement>) => void;
};

export default function StatusSelect ({ selectedStatus, onStatusChange }: Props) {

    return (
        <FormControl component="fieldset" style={{ marginBottom: '10px', display: 'flex' }}>
            <RadioGroup
                aria-label="status"
                name="status"
                value={selectedStatus}
                onChange={onStatusChange}
                style={{ display: 'flex', flexDirection: 'row' }}
            >
                <FormControlLabel value={Status.NOT_READ} control={<Radio color="secondary" />} label="Not Read" style={{ marginRight: '20px' }} />
                <FormControlLabel value={Status.READING} control={<Radio color="secondary" />} label="Reading" style={{ marginRight: '20px' }} />
                <FormControlLabel value={Status.READ} control={<Radio color="secondary" />} label="Read" />
            </RadioGroup>
        </FormControl>
    );
}

