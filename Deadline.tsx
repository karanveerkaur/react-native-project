import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import TaskItem from "./TaskItem";
import TaskInputField from "./TaskInputField";
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

function Deadline (props:any){
    const naviga = useNavigation();
    const [tasks, setTasks] = useState<Task[]>([]);

    const drawerStatus = useDrawerStatus();

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

                setTasks(JSON.parse(jsonValue)); 
                console.log(tasks);
            }
        } catch (error) {
            console.error('Error loading data:', error);
        }
    };


var due = new Date(Date.now());
if(props.route.params.due === "tomorrow"){
    due.setDate(due.getDate() + 1);
}
console.log("due: " + due);
   
    return (
        
        <View style={styles.container}>
            <ScrollView style={styles.scrollView}>
                {   
                    tasks.filter((v) => (v.date != null && new Date(v.date).getDate() == due.getDate())).map((task, index) => {
                        return (
                            <View key={index} style={styles.taskContainer}>
                                <TaskItem index={index + 1} task={task} deleteTask={() => props.route.params.oldProps.deleteTask(index)}/>
                            </View>
                        );
                        
                    })
                }
            </ScrollView>
            <View>
            </View>
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
    test:{
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
export default Deadline;