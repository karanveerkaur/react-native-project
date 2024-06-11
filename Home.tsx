import React, { useEffect, useState } from "react";
import 'react-native-gesture-handler';
import TaskInputField from './TaskInputField';
import TaskItem from './TaskItem';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    BackHandler
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import PushNotification from "react-native-push-notification";
//import { exists } from "react-native-fs";

import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDrawerStatus } from "@react-navigation/drawer";
type Task = {
    title: string | null,
    description: string | null,
    priority: String | null,
    date: Date | null,
    time: Date | null,
    done: boolean
};

PushNotification.createChannel(
    {
        channelId: "channel-id", // (required)
        channelName: "My channel", // (required)
        channelDescription: "A channel to categorise your notifications", // (optional) default: undefined.
        playSound: false, // (optional) default: true
        soundName: "default", // (optional) See `soundName` parameter of `localNotification` function
        //importance: Importance.HIGH, // (optional) default: Importance.HIGH. Int value of the Android notification importance
        vibrate: true, // (optional) default: true. Creates the default vibration pattern if true.
    },
    (created) => console.log(`createChannel returned '${created}'`) // (optional) callback returns whether the channel was created, false means it already existed.
);

const t: Task = {
    title: "ciao",
    description: "boh",
    priority: null,
    date: null,
    time: null,
    done: false
}




function Home(props: any) {

    BackHandler.addEventListener("hardwareBackPress", () => { return true });

    const naviga = useNavigation();
    const route = useRoute();
    const drawerStatus = useDrawerStatus();

    const [tasks, setTasks] = useState<Task[]>([]);
    const [check, setCheck] = useState(false);




    // gestione storage 

    useEffect(()=>{
        if(check){
            saveData(JSON.stringify(tasks))
        }
    }, [check])



    const loadData = async () => {
        try {
            const jsonValue = await AsyncStorage.getItem('myData');
            if (jsonValue !== null) {

                setTasks(JSON.parse(jsonValue)); // Merge with previous
            
            }
        } catch (error) {
            console.error('Error loading data:', error);
        }
    };

    const saveData = async (data: string) => {
        try {
            await AsyncStorage.setItem('myData', data);
            console.log('Data saved successfully.');
        } catch (error) {
            console.error('Error saving data:', error);
        }
        setCheck(false)
    };


    const clearData = async () => {
        try {
            await AsyncStorage.removeItem('myData');
            console.log('Data cleared successfully.');
            setTasks([]); // Clear data from state
        } catch (error) {
            console.error('Error clearing data:', error);
        }
    };

    // fine gestione storage

    const addTask = async (task: Task) => {
        if (task.title == "") {
            (naviga as any).navigate('edit', {
                index: tasks.length + 1,
                task: task,
            })

        } else {
            await setTasks([...tasks, task]);
            setCheck(true);
        }
    }


    useEffect(() => {
        if (drawerStatus === 'closed') {
            // Esegui azioni necessarie quando il drawer viene aperto
            console.log('Drawer closed - home');
            // Ricarica la pagina o esegui altre azioni necessarie
            loadData();
        }
    }, [drawerStatus]);

    function timeout(delay: number) {
        return new Promise(res => setTimeout(res, delay));
    }

    const deleteTask = async (deleteIndex: any) => {
        setTimeout(() => {

            
            
        }, 1000);
        setTasks(tasks.filter((value, index) => index != deleteIndex));
            setCheck(true)
            setNotification()       
    }

    const updateTask = (props: any) => {
        const temp: Task = {
            title: props.title,
            description: props.description,
            date: props.date,
            time: props.time,
            priority: props.priority,
            done: false
        }

        tasks[props.index - 1] = temp;
        setCheck(true)
        setNotification()
    }

    const setNotification = () => {
        PushNotification.cancelAllLocalNotifications()
        var currentTime = Date.now()
        const tmp: Task[] = tasks.filter((value) => value.time !== null && new Date(value.time).getTime() >= currentTime)
        tmp.map((t, i) => {
            PushNotification.localNotificationSchedule({
                channelId: "channel-id",
                id: i,
                title: "To-Done",
                message: t.title === null ? "" : t.title,
                date: t.time === null ? new Date(Date.now()) : new Date(t.time),
                allowWhileIdle: false,
                //invokeApp: false, 
                repeatTime: 1
            });
        })
    }


    if (props.route.params.update == 1) {
        updateTask(props.route.params)
        props.route.params.update = 0;
    }

    if (props.route.params.delete == 1) {
        deleteTask(props.route.params.index - 1)
        props.route.params.delete = 0;
    }

    return (

        <View style={styles.container}>
            <ScrollView style={styles.scrollView}>
                {

                    tasks.map((task: Task, index: number) => {

                        return (
                            <View key={index} style={styles.taskContainer}>
                                <TaskItem index={index + 1} task={task} deleteTask={() => deleteTask(index)} componentName={route.name}/>
                            </View>

                        );
                    })

                }

            </ScrollView>

            <TaskInputField addTask={addTask} priority='none' />
        </View>



    );
}





const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: '#1E1A3C',
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
    scrollView: {
        marginBottom: 70,
    },
    taskContainer: {
        marginTop: 20,
    },
    test: {
        color: '#fff',
        fontSize: 30,
        fontWeight: '600',
        marginTop: 30,
        marginBottom: 10,
        marginLeft: 20,
        fontStyle: "italic",
        paddingBottom: 100
    }



});

export default Home;