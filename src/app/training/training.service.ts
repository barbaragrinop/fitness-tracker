import { Exercise } from "./exercise.model";
import { Subject } from 'rxjs/Subject';
import { Injectable } from "@angular/core";
import { AngularFirestore } from "angularfire2/firestore";
import { map } from "rxjs/operators";

@Injectable()
export class TrainingService{

    exerciseChanged = new Subject<Exercise>();
    exercisesChanged = new Subject<Exercise[]>();
    private availableExercises: Exercise[] = [];
    finishedExercisesChanged = new Subject<Exercise[]>();
    private runnningExercise: Exercise;
    private finishedExercises: Exercise[] = [];

    constructor(private db: AngularFirestore){}

    fetchAvailableExercises(){
        this.db.collection<Exercise>('availableExercises')
        .snapshotChanges()
        .pipe(
            map((docArray) => {
                return docArray.map((doc) => {
                    return {
                    id: doc.payload.doc.id,
                    name: doc.payload.doc.data()['name'],
                    duration: doc.payload.doc.data()['duration'],
                    calories: doc.payload.doc.data()['calories']
                    }
                })
            })
        )
        .subscribe((exercises: Exercise[]) => {
            this.availableExercises = exercises;
            this.exercisesChanged.next([...this.availableExercises]);
        })
            
    }

    startExercise(selectedId: string){
        this.runnningExercise = this.availableExercises.find(
            ex => ex.id === selectedId
        );
        this.exerciseChanged.next({...this.runnningExercise})
    }

    completeExercise(){
        this.addDataToDatabase({
            ...this.runnningExercise,
            date: new Date(),
            state: "Completed"
        })
        this.runnningExercise = null;
        this.exerciseChanged.next(null);
    }

    cancelExercise(progress: number){
        this.addDataToDatabase({
            ...this.runnningExercise, 
            calories: this.runnningExercise.calories * (progress / 100),
            duration: this.runnningExercise.duration * (progress / 100),
            date: new Date(), 
            state: 'Cancelled', 
            
        });
        this.runnningExercise = null;
        this.exerciseChanged.next(null);
    }

    getRunningExercise(){
        return {...this.runnningExercise};
    }

    fetchCompletedOrCancelledExercises(){
        this.db.collection('finishedExercises')
        .valueChanges()
        .subscribe((exercises: Exercise[] ) => {
            this.finishedExercisesChanged.next(exercises);
        });
    }

    private addDataToDatabase(exercise: Exercise){
        this.db.collection('finishedExercises').add(exercise);
    }
}