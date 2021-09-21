package validator

import (
	"fmt"
	"regexp"

	"github.com/authelia/authelia/v4/internal/configuration/schema"
)

// ValidateTheme validates and update Theme configuration.
func ValidateTheme(configuration *schema.Configuration, validator *schema.StructValidator) {
	if configuration.Theme == "" {
		configuration.Theme = "light"
	}

	validThemes := regexp.MustCompile("light|dark|grey|auto|socib")

	if !validThemes.MatchString(configuration.Theme) {
		validator.Push(fmt.Errorf("Theme: %s is not valid, valid themes are: \"light\", \"dark\", \"grey\", \"socib\" or \"auto\"", configuration.Theme))
	}
}
