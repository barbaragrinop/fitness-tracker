import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Exercise } from '../exercise.model';
import { TrainingService } from '../training.service';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css']
})
export class NewTrainingComponent implements OnInit {

  @Output() trainingStart = new EventEmitter<void>();
  exercises: Exercise[] = [];
  constructor(private training: TrainingService) { }

  ngOnInit(): void {
    this.exercises = this.training.getAvailableExercises();
  }

  onStartTraining(){
    this.trainingStart.emit();
  }

}
