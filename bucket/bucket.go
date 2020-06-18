package bucket

import "io"

type Bucket interface {
	WriteFile(name string, r io.Reader) error
	RemoveFile(name string) error
	ReadFile(name string) (io.Reader, error)
}
