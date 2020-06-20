package bucket

import "io"

// The Bucket interface defines a generic way to store and access files.
// There are two implementations of this interface.
// 1. CloudBucket can store files in Google Cloud storage if running on 
// App Engine.
// 2. LocalBucket can store files on disk if running locally.
type Bucket interface {
	WriteFile(name string, r io.Reader) error
	RemoveFile(name string) error
	ReadFile(name string) (io.Reader, error)
}
