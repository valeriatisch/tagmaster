package bucket

import (
	"os"
	"io"
)

type LocalBucket struct {
	dir string
}

func NewLocalBucket() LocalBucket {
	return LocalBucket {
		dir: "tmp/",
	}
}

func (l LocalBucket) ReadFile(name string) (io.Reader, error) {
	return os.Open(l.dir + name)
}

func (l LocalBucket) RemoveFile(name string) error {
	return os.Remove(name)
}

func (l LocalBucket) WriteFile(name string, r io.Reader) error {
	f, err := os.Create(l.dir + name)
	if err != nil {
		return err
	}

	_, err = io.Copy(f, r)

	return err
}