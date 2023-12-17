import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Slider from '@mui/material/Slider';
import FormControl from '@mui/material/FormControl';
import InputAdornment from '@mui/material/InputAdornment';
import OutlinedInput from '@mui/material/OutlinedInput';
import Button from '@mui/material/Button';
import { useState } from 'react';

const Index = ({min, max, onClose}) => {
    const [range, setRange] = useState([min, max]);
    const minDistance = 10;
    const handleRangeChange = (event, newValue, activeThumb) => {
        if (!Array.isArray(newValue)) {
        return;
        }

        if (newValue[1] - newValue[0] < minDistance) {
        if (activeThumb === 0) {
            const clamped = Math.min(newValue[0], 100 - minDistance);
            setRange([clamped, clamped + minDistance]);
        } else {
            const clamped = Math.max(newValue[1], minDistance);
            setRange([clamped - minDistance, clamped]);
        }
        } else {
        setRange(newValue);
        }
    };

    const handleClose = () => {
        onClose();
  };

    return (
        <Card sx={{ minWidth: 275 }}>
                <CardContent>
                    <h6 className="text-xl font-semibold">
                        Price range
                    </h6>
                    <span className="text-sm" color="text.secondary">
                    Use slider or enter min and max price
                    </span>
                    <div className="my-5 flex flex-row">
                        <FormControl className="w-36" variant="outlined" size="small">
                            <OutlinedInput
                                type="number"
                                value={range[0]}
                                placeholder="Min"
                                id="standard-adornment-amount"
                                endAdornment={<InputAdornment position="end">&nbsp;€</InputAdornment>}
                                onChange={(event) => {
                                    setRange([event.target.value,range[1]]);
                                }}
                            />
                        </FormControl> <span className="mx-2">_</span>
                        <FormControl className="w-36" variant="outlined" size="small">
                            <OutlinedInput
                                type="number"
                                value={range[1]}
                                placeholder="Max"
                                id="standard-adornment-amount"
                                endAdornment={<InputAdornment position="end">&nbsp;€</InputAdornment>}
                                onChange={(event) => {
                                    setRange([range[0], event.target.value]);
                                }}
                            />
                        </FormControl>
                    </div>
                    <Slider
                        value={range}
                        min={0} max={1000}
                        onChange={handleRangeChange}
                        valueLabelDisplay="auto"
                        disableSwap
                    />
                </CardContent>
                <CardActions className="flex justify-end">
                    <Button size="small" onClick={handleClose}>Cancel</Button>
                    <Button size="small" onClick={handleClose}>Confirm</Button>
                </CardActions>
            </Card>
    )
}

export default Index;
