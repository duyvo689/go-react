package main

import (
	"os"

	"github.com/duyvo689/go-react/routes"
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func main() {
	port := os.Getenv("PORT")
	if port == "" {
		port = "8000"
	}

	router := gin.New()
	router.Use(gin.Logger())
	router.Use(cors.Default())

	router.POST("/entry/create", routes.AddEntry)
	router.GET("/entries", routes.GetEntries)
	router.GET("/entries/:id/", routes.GetEntryById)
	router.GET("/ingreadient/:ingreadient", routes.GetEntriesByIngredient)

	router.PUT("/entry/update/:id", routes.UpdateEntry)
	router.PUT("/ingreadient/update/:id", routes.UpdateIngredient)
	router.DELETE("Entry/delete/:id", routes.DeleteEntry)
	router.Run(":" + port)
}
