import React, { ChangeEvent, useState } from 'react';
import { Button, Form, Segment } from 'semantic-ui-react';
import { Activity } from '../../../app/modules/activity';

interface Props {
    activity: Activity | undefined;
    closeForm: () => void;
    createOrEdit: (activity: Activity) => void;
}

export default function ActivityForm({activity: selectedActivity, closeForm, createOrEdit}: Props) {

    const initialState = selectedActivity ?? {
        id: '',
        title: '',
        category: '',
        description: '',
        date: '',
        city: '',
        venue: ''
    }

    const [activity, setActivity] = useState(initialState);

    function handleSubmit() {
        createOrEdit(activity);
    }

    function handleInputChgange(event: ChangeEvent<HTMLInputElement| HTMLTextAreaElement>) {
        const {name, value} = event.target;
        setActivity({...activity, [name]: value})
    }
    
    return (
        <Segment clearing>
            <Form onSubmit={handleSubmit} autoComplete='off'>
                <Form.Input placeholder='Title' value={activity.title} onChange={handleInputChgange} name='title' />
                <Form.TextArea placeholder='Description' value={activity.description} onChange={handleInputChgange} name='description'  />
                <Form.Input placeholder='Category' value={activity.category} onChange={handleInputChgange} name='category' />
                <Form.Input placeholder='Date' value={activity.date} onChange={handleInputChgange} name='date' />
                <Form.Input placeholder='City' value={activity.city} onChange={handleInputChgange} name='city' />
                <Form.Input placeholder='Venue' value={activity.venue} onChange={handleInputChgange} name='venue' />
                <Button on floated='right' positive type='submit' content='Submit' />
                <Button onClick={closeForm}floated='right' type='button' content='Cancel' />
            </Form>
        </Segment>
    )
}