import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Exercise } from '../exercise.model';
import { AngularFirestore, docChanges } from 'angularfire2/firestore';
import { TrainingService } from '../training.service';
import { Observable } from 'rxjs/observable';
import { Subscription } from 'rxjs/Subscription';
import { switchMap } from 'rxjs/operators'

import { map } from 'rxjs/operators';
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css']
})

export class NewTrainingComponent implements OnInit, OnDestroy {

  exerciseSubscription: Subscription;
  @Output() trainingStart = new EventEmitter<void>();
  exercises: Exercise[];
  constructor(private training: TrainingService) { }

  ngOnInit() {
    this.exerciseSubscription = this.training.exercisesChanged.subscribe(exercises => this.exercises = exercises);
    this.training.fetchAvailableExercises();
  }

  onStartTraining(form: NgForm){
    this.training.startExercise(form.value.exercise);
  }

  ngOnDestroy(){
    this.exerciseSubscription.unsubscribe();
  }
}