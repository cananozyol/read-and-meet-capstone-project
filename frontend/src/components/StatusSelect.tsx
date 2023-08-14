import {ChangeEvent} from 'react';
import {FormControl, FormControlLabel, Radio, RadioGroup} from '@mui/material';
import {Status} from '../models/books';

type Props = {
    selectedStatus: Status;
    onStatusChange: (event: ChangeEvent<HTMLInputElement>) => void;
};

export function getStatusDisplay(status: Status) {
    switch (status) {
        case Status.NOT_READ:
            return "Not Read";
        case Status.READING:
            return "Reading";
        case Status.READ:
            return "Read";
        default:
            return "";
    }
}

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
                <FormControlLabel
                    value={Status.NOT_READ}
                    control={<Radio color="secondary" />}
                    label={getStatusDisplay(Status.NOT_READ)}
                    style={{ marginRight: '20px' }}
                />
                <FormControlLabel
                    value={Status.READING}
                    control={<Radio color="secondary" />}
                    label={getStatusDisplay(Status.READING)}
                    style={{ marginRight: '20px' }}
                />
                <FormControlLabel
                    value={Status.READ}
                    control={<Radio color="secondary" />}
                    label={getStatusDisplay(Status.READ)}
                />
            </RadioGroup>
        </FormControl>
    );
}

