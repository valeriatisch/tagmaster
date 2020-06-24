package models

import (
	"github.com/jinzhu/gorm"
)

type Project struct {
	gorm.Model
	Name string
	UserID uint
	Images []Image
}

func (project *Project) Id() uint {
	return project.Model.ID
}

func (project *Project) BeforeDelete(tx *gorm.DB) error {
	// Cascading delete of associated images.
	// We use this instead of a foreign key constraint,
	// because this only soft-deletes things.
	var images []Image
	tx.Model(project).Related(&images)
	for _, img := range images {
		// TODO: should we do something in case of error?
		tx.Delete(&img)
	}

	return nil
}
