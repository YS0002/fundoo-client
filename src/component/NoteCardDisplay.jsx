/**
 * @description Component to display Notes
 * @author Yash
 * @since 8/12/18
 * @version 1.12
 */

import React from 'react';
import { Card, Chip } from '@material-ui/core';
import ReminderPopper from './ReminderPopper';
import ColorSection from './ColorSection';
import ArchiveNote from './ArchiveNote';
import MoreOptions from './MoreOptions';
import PinNote from './PinNote';

export default class NoteCardDisplay extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            note: this.props.noteSelected,
        }
    }

    getBackGroundColor = (colorSelected, note) => {

        let request = {
            thread: "/updateNoteColor",
            data: {
                note: {
                    _id: note._id,
                    color: colorSelected
                }
            }
        }

        let noteTemp = this.state.note;
        noteTemp.color = colorSelected;
        this.setState({
            note : noteTemp
        })

        this.props.getUpdate(request, this.state.note);
    }

    getReminder = (reminderSet, note) => {
        let request = {
            thread: "/updateNoteReminder",
            data: {
                note: {
                    _id: note._id,
                    reminder: reminderSet
                }
            }
        }

        let noteTemp = this.state.note;
        noteTemp.reminder = reminderSet;
        this.setState({
            note : noteTemp
        })

        this.props.getUpdate(request, this.state.note);
    }

    getReminderRemoved = (note) => {

        let request = {
            thread: "/updateNoteReminder",
            data: {
                note: {
                    _id: note._id,
                    reminder: ""
                }
            }
        }

        let noteTemp = this.state.note;
        noteTemp.reminder = "";
        this.setState({
            note : noteTemp
        })

        this.props.getUpdate(request, this.state.note);
    }

    getPin = (pinSet, note) => {
        let request = {
            thread: "/updateNotePin",
            data: {
                note: {
                    _id: note._id,
                    pin: pinSet
                }
            }
        }

        let noteTemp = this.state.note;
        noteTemp.pin = pinSet;
        this.setState({
            note : noteTemp
        })

        this.props.getUpdate(request, this.state.note);

    }

    getTrash = (trashSet, note) => {

        let request = {
            thread: "/updateNoteTrash",
            data: {
                note: {
                    _id: note._id,
                    trash: trashSet
                }
            }
        }

        let noteTemp = this.state.note;
        noteTemp.trash = trashSet;
        this.setState({
            note : noteTemp
        })

        this.props.getUpdate(request, this.state.note);

    }

    getArchive = (archiveSet, note) => {

        let request = {
            thread: "/updateNoteReminder",
            data: {
                note: {
                    _id: note._id,
                    archive: archiveSet
                }
            }
        }

        let noteTemp = this.state.note;
        noteTemp.archive = archiveSet;
        this.setState({
            note : noteTemp
        })

        this.props.getUpdate(request, this.state.note);

    }

    render() {

        return (

            <div className={this.props.notesView ? "notesGridDisplayDiv" : "notesListDisplayDiv"} >

                <Card className={this.props.notesView ? "notesGridDisplayCard" : "notesListDisplayCard"} >

                    <div style={{ backgroundColor: this.state.note.color, width: "-webkit-fill-available" }} >
                        <div className="noteCardDisplayTitleDiv" >
                            <div className="noteCardDisplayTitle" > {this.state.note.title}</div>
                            <PinNote noteSelected={this.state.note} getPin={this.getPin} getNotePin={this.state.note.pin} />

                        </div>
                        <div className="noteCardDisplayDescription" >
                            {this.state.note.description}
                        </div>

                        {this.state.note.reminder === "" ? (
                            <div>
                            </div>
                        ) : (
                                <div >
                                    <Chip
                                        icon={<img className="reminderClock" src={require('../assets/images/clocktime.svg')} alt="reminderClock" />}
                                        label={<span className="reminderShowOnCardText" >  {this.state.note.reminder} </span>}
                                        onDelete={() => this.getReminderRemoved(this.state.note)}
                                        variant="outlined"
                                        className="chipOnCardReminder"
                                    />
                                </div>
                            )}

                        <div>
                            <ReminderPopper getReminderChooseOption={this.getReminder} noteSelected={this.state.note} />
                            <img className="noteAddFeatureImages" src={require('../assets/images/personAdd.svg')} alt="addPerson" />
                            <ColorSection getColor={this.getBackGroundColor} noteSelected={this.state.note} />
                            <img className="noteAddFeatureImages" src={require('../assets/images/imageAdd.svg')} alt="uploadImage" />
                            <ArchiveNote noteSelected={this.state.note} getArchive={this.getArchive} getNoteArchive={this.state.note.archive} />
                            <MoreOptions noteSelected={this.state.note} getTrash={this.getTrash} />
                        </div>
                    </div>

                </Card>
            </div>
        )
    }
}