package handlers

import (
	"fmt"
	"net/http"
	"time"
)

func SingleCheckUrl(url string) map[string]string {
	client := &http.Client{
		Timeout: 5 * time.Second,
	}

	resp, err := client.Get(url)
	if err != nil {
		return map[string]string{"error": err.Error()}
	}
	defer resp.Body.Close()

	return map[string]string{
		"status": fmt.Sprintf("%d %s", resp.StatusCode, http.StatusText(resp.StatusCode)),
	}
}




func MultipleCheckUrl(urls []string) map[string]string {
	return make(map[string]string)
}