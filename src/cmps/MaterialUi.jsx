import Stack from '@mui/material/Stack'
import Button from '@mui/material/Button'
import Rating from '@mui/material/Rating'
import { useState } from 'react'

export function MaterialUi() {
    const [value, setValue] = useState(2)

    return (
        <section style={{ width: '70vw', margin: '50px', display: 'flex', flexDirection: 'column', gap: '40px' }}>
            <Stack width='30vw' spacing={2} direction="column">
                <Button variant="text">Text</Button>
                <Button variant="contained">Contained</Button>
                <Button variant="outlined">Outlined</Button>
            </Stack>
            <section>
                <h1>{value}</h1>
                <Rating
                    name="simple-controlled"
                    value={value}
                    onChange={(event, newValue) => {
                        setValue(newValue)
                    }}
                />
            </section>
        </section>
    )
}