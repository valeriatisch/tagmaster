import (
	"github.com/jinzhu/gorm"
)

type Label struct {
	gorm.Model
	Name string
	topright float64
	topleft float64
	bottomright float64
	bottomleft float64
	ImageID uint
}

