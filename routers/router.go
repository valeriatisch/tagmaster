package routers

import (
	"github.com/astaxie/beego"
	// "github.com/valeriatisch/tagmaster/controllers"
)

func init() {
	beego.SetStaticPath("/", "client/build/")
}
