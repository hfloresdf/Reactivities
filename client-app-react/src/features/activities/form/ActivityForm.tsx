import { observer } from 'mobx-react-lite';
import React, { ChangeEvent, useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router';
import { Button, Form, Segment } from 'semantic-ui-react';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { useStore } from '../../../app/stores/store';
import {v4 as uuid} from 'uuid';
import { Link } from 'react-router-dom';

export default observer(function ActivityForm() {
    let history = useHistory();
    const {activityStore} = useStore();
    const {createActivity, updateActivity, 
        loading, loadActivity, loadingInitial} = activityStore;
    const {id} = useParams<{id: string}>();

    const [activity, setActivity] = useState({
        id: '',
        title: '',
        category: '',
        description: '',
        date: '',
        city: '',
        venue: ''
    });

    useEffect(() => {
        if (id) loadActivity(id).then(activity => setActivity(activity!));
    }, [id, loadActivity]);

    function handleSubmit() {
       if (activity.id.length === 0) {
           let newActivity = {
               ...activity,
               id: uuid()
           };
           createActivity(newActivity).then(() => history.push(`/activities/${newActivity.id}`));
       } else {
           updateActivity(activity).then(() => history.push(`activities/${activity.id}`));
       }
    }

    function handleInputChgange(event: ChangeEvent<HTMLInputElement| HTMLTextAreaElement>) {
        const {name, value} = event.target;
        setActivity({...activity, [name]: value})
    }

    if (loadingInitial) return <LoadingComponent content='Loading Activity...' />
    
    return (
        <Segment clearing>
            <Form onSubmit={handleSubmit} autoComplete='off'>
                <Form.Input placeholder='Title' value={activity.title} onChange={handleInputChgange} name='title' />
                <Form.TextArea placeholder='Description' value={activity.description} onChange={handleInputChgange} name='description'  />
                <Form.Input placeholder='Category' value={activity.category} onChange={handleInputChgange} name='category' />
                <Form.Input type='date' placeholder='Date' value={activity.date} onChange={handleInputChgange} name='date' />
                <Form.Input placeholder='City' value={activity.city} onChange={handleInputChgange} name='city' />
                <Form.Input placeholder='Venue' value={activity.venue} onChange={handleInputChgange} name='venue' />
                <Button loading={loading} floated='right' positive type='submit' content='Submit' />
                <Button as={Link} to='/activities' floated='right' type='button' content='Cancel' />
            </Form>
        </Segment>
    )
})