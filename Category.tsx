import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import TaskInputField from "./TaskInputField";
import { useNavigation, DrawerActions, useRoute } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import TaskItem from "./TaskItem";
import { DeviceEventEmitter } from "react-native"
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDrawerStatus } from "@react-navigation/drawer";

type Task = {
    title: string | null,
    description: string | null,
    priority: String | null,
    date: Date | null,
    time: Date | null,
    done: boolean
};




function Category(props: any) {
    const [tasks, setTasks] = useState<Task[]>([]);
    const naviga = useNavigation();
    const route = useRoute();
    const [check, setCheck] = useState(false);
    const drawerStatus = useDrawerStatus();

    useEffect(()=>{
        if(check){
            console.log("jshfaj")
            saveData(JSON.stringify(tasks))
        }
    }, [check])

    useEffect(() => {
        if (drawerStatus === 'closed') {
            // Esegui azioni necessarie quando il drawer viene aperto
            console.log('Drawer aperto');
            loadData();
            // Ricarica la pagina o esegui altre azioni necessarie
        }
    }, [drawerStatus]);

    const loadData = async () => {
        try {
            const jsonValue = await AsyncStorage.getItem('myData');
            if (jsonValue !== null) {

                await setTasks(JSON.parse(jsonValue));
                
                console.log(tasks);
            }
        } catch (error) {
            console.error('Error loading data:', error);
        }
    };


    const saveData = async (data: string) => {
        try {
            console.log(data)
            await AsyncStorage.setItem('myData', data);
            console.log('Data saved successfully - cat');
        } catch (error) {
            console.error('Error saving data:', error);
        }
        setCheck(false)
    };


    const addTask = async (task: Task) => {
        if (task.title == "") {
            (naviga as any).navigate('edit', {
                index: tasks.length + 1,
                task: task
            })

        } else {
            await setTasks([...tasks, task]);
            setCheck(true);
        }
    }

    const deleteTask = async (deleteIndex: any) => {
        await setTasks(tasks.filter((value, index) => index != deleteIndex));
        console.log("llll")
        setCheck(true)
    }

    let indexs = tasks.map((t,i) => ({t,i}));

    return (

        <View style={styles.container}>
           
            <ScrollView style={styles.scrollView}>
                {
                    
                    indexs.filter((e, i) => e.t.priority == props.route.params.priority).map((task) => {
                        return (

                            <View key={task.i} style={styles.taskContainer}>

                                <TaskItem index={task.i + 1} task={task.t} deleteTask={() => deleteTask(task.i)} componentName={route.name}/>
                            </View>
                        );
                    })
                }
            </ScrollView>
            <View>
            </View>
            <TaskInputField addTask={addTask} priority={props.route.params.priority} />


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

export default Category;