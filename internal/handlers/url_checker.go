package handlers

import (
	"fmt"
	"io"
	"net/http"
	"regexp"
	"time"
)

// func SingleCheckUrl(url string) map[string]string {
// 	client := &http.Client{
// 		Timeout: 5 * time.Second,
// 	}

// 	resp, err := client.Get(url)
// 	if err != nil {
// 		return map[string]string{"error": err.Error()}
// 	}
// 	defer resp.Body.Close()

// 	return map[string]string{
// 		"status": fmt.Sprintf("%d %s", resp.StatusCode, http.StatusText(resp.StatusCode)),
// 	}
// }



func SingleCheckUrl(url string) map[string]string {
	startTime := time.Now()
	client := &http.Client{
		Timeout: 5 * time.Second,
	}

	resp, err := client.Get(url)
	if err != nil {
		return map[string]string{
			"error": err.Error(),
		}
	}
	defer resp.Body.Close()

	responseTime := fmt.Sprintf("%d", time.Since(startTime).Milliseconds())

	// Read the body to potentially extract title
	body, err := io.ReadAll(resp.Body)
	var title string
	if err == nil {
		// Simple HTML title extraction
		re := regexp.MustCompile(`<title>(.*?)</title>`)
		matches := re.FindStringSubmatch(string(body))
		if len(matches) > 1 {
			title = matches[1]
		}
	}

	return map[string]string{
		"status":       fmt.Sprintf("%d %s", resp.StatusCode, http.StatusText(resp.StatusCode)),
		"response":     resp.Status,
		"title":        title,
		"contentType":  resp.Header.Get("Content-Type"),
		"responseTime": responseTime,
	}
}




func MultipleCheckUrl(urls []string) map[string]string {
	return make(map[string]string)
}