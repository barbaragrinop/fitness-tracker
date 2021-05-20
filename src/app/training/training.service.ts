import { Exercise } from "./exercise.model";

export class TrainingService{
    
    private availableExercises: Exercise[] = [
        {id:'crunches' , name: 'Abdominal' , duration: 30 , calories: 8},
        {id: 'touch-toes' , name: 'Tocar nos Pés' , duration: 180 , calories: 15},
        {id: 'side-lunges' , name: 'Lunges' , duration: 120 , calories: 18},
        {id: 'burpess' , name: 'Flexão' , duration: 60 , calories: 8}
    ];

    getAvailableExercises(){
        return this.availableExercises.slice();
    }
}