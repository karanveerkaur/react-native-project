import React, { useState } from "react";
import { View, Text, TextInput,TouchableOpacity, StyleSheet, TextBase, KeyboardAvoidingView, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
//import axios from "axios";
import { SelectList } from 'react-native-dropdown-select-list'
import DateTimePicker from "react-native-modal-datetime-picker";
//import { Timestamp } from "firebase/firestore";


function EditTask(props: any) {

    const naviga = useNavigation();

    // qui si possono aggiungere o togliere le categorie sarebbero da mettere in un file json e poi leggere
    const data = [
        { key: '1', value: 'none', },
        { key: '2', value: 'high' },
        { key: '3', value: 'medium' },
        { key: '4', value: 'low', }
    ]

    const index = props.route.params.index;
    const task : any = props.route.params.task;

    const [title, setTitle] = useState(task.title);
    const [description, setDescription] = useState(task.description);
    const [selected, setSelected] = useState(task.priority);
    const [date, setDate] = useState<Date | null>(task.date != null ? new Date(task.date) : null);
    const [time, setTime] = useState<Date | null>(task.time != null ? new Date(task.time) : null);
    //const elimina = () => props.route.params.oldProps.deleteTask();

    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [isTimePickerVisible, setTimePickerVisibility] = useState(false);

    const onDelete = () => {

        (naviga as any).navigate('home', {
            update: 0,
            delete: 1,
            index: index
        })
    }

    const onUpdate = () => {
            (naviga as any).navigate('home', {
                update: 1,
                delete: 0,
                title: title,
                description: description,
                priority: selected,
                date: date,
                time: time,
                index: index
            })

    }

    const onChangeDate = (selected: Date) =>{
        var currentTime = new Date(Date.now());
        if(checkDate(selected)){
            setDatePickerVisibility(false)
            return;
        }
        setDate(selected);
        setDatePickerVisibility(false)
    }

    const onChangeTime = (selected: Date) =>{
        var currentTime = Date.now();
        if(date !== null && date.getTime()<=currentTime && selected.getTime()<currentTime){
            setTimePickerVisibility(false)
            return;
        }else if(date === null && selected.getTime()<currentTime){
            setTime(selected)

            const currentDate = new Date();
            currentDate.setDate(currentDate.getDate() + 1);
            setDate(currentDate);
            setTimePickerVisibility(false)
            return;
        }
    
        setTime(selected);
        if (date === null)
            setDate(new Date())
        setTimePickerVisibility(false)
    }

    const onCancelDate = () =>{
        setDatePickerVisibility(false)
        setDate(null)
        setTime(null)
    }

    const onCancelTime = () =>{
        setTimePickerVisibility(false)
        setTime(null)
    }

    const checkDate = (selected: Date)=>{
        var currentTime = new Date(Date.now());
        return selected.getDate()<currentTime.getDate()
    }

    const getTimeString = () =>{
        var stampa: String = '';
        var h = time?.getHours()
        if(h != undefined && h<10)
            stampa = '0'
        stampa += h + ':'
        var m = time?.getMinutes()
        if(m != undefined && m<10)
            stampa += '0'
        stampa += m + ''
        return stampa;
    }

    return (

        <View style={styles.main}>

            <View >
                <Text style={styles.heading}></Text>

                <Text style={styles.label}>Title</Text>

                <KeyboardAvoidingView style={styles.container2}>
                    <TextInput 
                    style={styles.inputField} 
                    value={title} 
                    onChangeText={text => setTitle(text)} 
                    placeholder={'Insert Title'} 
                    placeholderTextColor={'grey'} />
                </KeyboardAvoidingView>


                <Text style={styles.label}>Description</Text>

                <KeyboardAvoidingView style={styles.container2}>
                    <TextInput 
                        numberOfLines={4} 
                        style={styles.inputField} 
                        value={description} 
                        onChangeText={text => setDescription(text)} 
                        placeholder={'Insert Description'} 
                        placeholderTextColor={'grey'} />
                </KeyboardAvoidingView>

                <Text style={styles.label}>Priority</Text>
                    {<SelectList
                        placeholder={selected}
                        setSelected={((val: React.SetStateAction<string>) => setSelected(val))}
                        data={data}
                        save="value"
                        boxStyles={styles.container2}
                        dropdownStyles={styles.container2}
                        search={false}
                       
                        
                    />}
                
                <Text style={styles.label}>Date</Text>
                <Pressable onPress={() => setDatePickerVisibility(true)}>
                    <KeyboardAvoidingView style={styles.container2}>
                        <Text style={date === null ? styles.label2 : (date.getDate() < new Date(Date.now()).getDate() ? styles.label4 : styles.label3)}>
                            {date === null ? 'date' : date.toDateString()}
                        </Text>
            
                        {<DateTimePicker
                            isVisible={isDatePickerVisible}
                            mode='date'
                            onConfirm={onChangeDate}
                onCancel={onCancelDate}/>}
                </KeyboardAvoidingView>
                </Pressable>

                <Text style={styles.label}>Time</Text>
                <Pressable onPress={() => setTimePickerVisibility(true)}>
                    <KeyboardAvoidingView style={styles.container2}>
                
                    <Text style={time === null ? styles.label2 : (time.getTime() <= Date.now() && date != null && date.getTime() <= Date.now()? styles.label4 : styles.label3)}>
                        {time == null ? 'time' : getTimeString()//time.getHours()+":"+time.getMinutes()}
                        }
                    </Text>
                
                    {<DateTimePicker
                        isVisible={isTimePickerVisible}
                        mode='time'
                        onConfirm={onChangeTime}
                        onCancel={onCancelTime}/>}
            </KeyboardAvoidingView>
                </Pressable>
            </View>

            <View style={{
                flexDirection: "row",
                marginTop: 25,
                alignContent: "center",
                justifyContent: 'space-between',
                paddingHorizontal: 50}}>
                <TouchableOpacity onPress={() => onDelete()}>
                    <View style={styles.button}>
                        <Text style={{color: 'white'}}>Delete</Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => onUpdate()}>
                    <View style={styles.button}>
                        <Text style={{color: 'white'}}>Save</Text>
                    </View>
                </TouchableOpacity>
            </View>


        </View>

    );  


}




const styles = StyleSheet.create({
    button: {
        height: 45,
        width: 100,
        borderRadius: 20,
        backgroundColor: 'black',
        alignItems: 'center',
        color: "black",
        paddingVertical: 13
    },

    label: {
        color: '#fff',
        fontSize: 20,
        fontWeight: '600',
        marginTop: 10,
        marginBottom: 10,
        marginLeft: 20,
    },
    container2: {
        borderColor: '#fff',
        backgroundColor: '#3E3364',
        borderWidth: 1,
        marginHorizontal: 20,
        borderRadius: 12,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 10,


    },
    inputField: {
        color: '#fff',
        height: 50,
        flex: 1,
    },
    heading: {
        color: '#fff',
        fontSize: 30,
        fontWeight: '600',
        marginTop: 30,
        marginBottom: 10,
        marginLeft: 20,
        fontStyle: "italic"
    },

    main: {
        flex: 1,
        backgroundColor: '#1E1A3C',
    },

    container: {
        flexDirection: 'row',
        marginHorizontal: 20,
    },

    bc1: {
        color: "red",
        marginRight: 2,
        borderColor: "red"
    },
    indexContainer: {
        backgroundColor: '#3E3364',
        borderRadius: 12,
        marginRight: 10,
        alignItems: 'center',
        justifyContent: 'center',
        width: 50,
        height: 50,
    },
    index: {
        color: '#fff',
        fontSize: 20,
    },
    taskContainer: {
        backgroundColor: '#3E3364',
        borderRadius: 12,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        flex: 1,
        paddingHorizontal: 10,
        paddingVertical: 5,
        minHeight: 50,
    },
    task: {
        color: '#fff',
        width: '90%',
        fontSize: 16,
        paddingLeft: 10
    },
    label2:{
        color: 'grey',
        marginTop: 15,
        marginBottom: 15,
        marginLeft: 2
    },
    label3:{
        color: '#fff',
        fontSize: 20,
        fontWeight: '500',
        marginTop: 11,
        marginBottom: 11
    },
    label4:{
        color: 'red',
        fontSize: 20,
        fontWeight: '500',
        marginTop: 11,
        marginBottom: 11
    }
});

export default EditTask;