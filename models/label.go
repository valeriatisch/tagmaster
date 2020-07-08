import (
	"github.com/jinzhu/gorm"
)

type Label struct {
	gorm.Model
	topright float64
	topleft float64
	bottomright float64
	bottomleft float64
	titel uint
}

func (label *Label) Id() uint {
	return label.Model.ID
}