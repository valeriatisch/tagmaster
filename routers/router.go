package routers

import (
	"github.com/valeriatisch/tagmaster/controllers"

	"github.com/astaxie/beego"
)

func init() {
	beego.SetStaticPath("/", "client/build/")

	ns := beego.NewNamespace("/v1",
		beego.NSNamespace("/object",
			beego.NSInclude(
				&controllers.ObjectController{},
			),
		),
		beego.NSNamespace("/user",
			beego.NSInclude(
				&controllers.UserController{},
			),
		),
	)
	beego.AddNamespace(ns)
}
