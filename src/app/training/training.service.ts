import { Exercise } from "./exercise.model";
import { Subject } from 'rxjs/Subject';

export class TrainingService{

    exerciseChanged = new Subject<Exercise>();
    
    private availableExercises: Exercise[] = [
        {id:'crunches' , name: 'Abdominal' , duration: 30 , calories: 8},
        {id: 'touch-toes' , name: 'Tocar nos Pés' , duration: 180 , calories: 15},
        {id: 'side-lunges' , name: 'Lunges' , duration: 120 , calories: 18},
        {id: 'burpess' , name: 'Flexão' , duration: 60 , calories: 8}
    ];

    private runnningExercise: Exercise;

    getAvailableExercises(){
        return this.availableExercises.slice();
    }

    startExercise(selectedId: string){
        const selectedExercise = this.availableExercises.find(ex => ex.id === selectedId);
        this.runnningExercise = selectedExercise;
        this.exerciseChanged.next({...this.runnningExercise})
    }

    getRunningExercise(){
        return {...this.runnningExercise}
    }
}