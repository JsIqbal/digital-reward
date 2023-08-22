package main

import (
	"fmt"
)

type Robot struct {
	ID         int
	Name       string
	PositionX  int
	PositionY  int
	IsJumping  bool
	IsWalking  bool
	IsDancing  bool
	IsSinging  bool
}

func NewRobot(id int, name string) *Robot {
	return &Robot{
		ID:   id,
		Name: name,
	}
}

func (r Robot) Walk(steps int) {
	if !r.IsJumping && !r.IsDancing {
		r.PositionX += steps
		r.IsWalking = true
	}
}

func (r *Robot) Jump(height int) {
	if !r.IsWalking && !r.IsDancing {
		r.PositionY += height
		r.IsJumping = true
	}
}

func main() {
	robot := NewRobot(1, "Robo")
	fmt.Println("Original Position:", robot.PositionX, robot.PositionY)

	robot.Walk(5)
	fmt.Println("Position After Walking:", robot.PositionX, robot.PositionY)

	robot.Jump(3)
	fmt.Println("Position After Jumping:", robot.PositionX, robot.PositionY)
}
